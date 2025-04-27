from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import LoanApplication
import json

def home(request):
    return render(request, 'bank_app/home.html')

def loan_application(request):
    if request.method == 'POST':
        # Get form data
        data = {
            'no_of_dependents': int(request.POST.get('no_of_dependents')),
            'education': request.POST.get('education'),
            'self_employed': request.POST.get('self_employed'),
            'income_annum': float(request.POST.get('income_annum')),
            'loan_amount': float(request.POST.get('loan_amount')),
            'loan_term': int(request.POST.get('loan_term')),
            'cibil_score': int(request.POST.get('cibil_score')),
            'residential_assets_value': float(request.POST.get('residential_assets_value')),
            'commercial_assets_value': float(request.POST.get('commercial_assets_value')),
            'luxury_assets_value': float(request.POST.get('luxury_assets_value')),
            'bank_asset_value': float(request.POST.get('bank_asset_value'))
        }
        
        # Calculate interest rate
        cibil_score = data['cibil_score']
        loan_amount = data['loan_amount']
        
        rate = 10  # Base rate
        if cibil_score >= 800:
            rate -= 3.5
        elif cibil_score >= 750:
            rate -= 2.5
        elif cibil_score >= 700:
            rate -= 1.5
        elif cibil_score >= 650:
            rate -= 0.5
            
        if loan_amount >= 50000:
            rate -= 0.25
        if loan_amount >= 100000:
            rate -= 0.25
            
        rate = max(3, rate)
        
        # Calculate total assets
        total_assets = (
            data['residential_assets_value'] +
            data['commercial_assets_value'] +
            data['luxury_assets_value'] +
            data['bank_asset_value']
        )
        
        # Determine loan approval
        income_to_loan_ratio = data['income_annum'] / data['loan_amount']
        assets_to_loan_ratio = total_assets / data['loan_amount']
        is_cibil_good = data['cibil_score'] >= 700
        is_income_adequate = income_to_loan_ratio >= 0.3
        has_strong_assets = assets_to_loan_ratio >= 1.5
        
        is_approved = False
        if is_cibil_good and is_income_adequate:
            is_approved = True
        elif data['cibil_score'] >= 750 and (is_income_adequate or has_strong_assets):
            is_approved = True
        elif data['cibil_score'] >= 650 and is_income_adequate and has_strong_assets:
            is_approved = True
        
        # Create loan application
        loan = LoanApplication.objects.create(
            no_of_dependents=data['no_of_dependents'],
            education=data['education'],
            self_employed=data['self_employed'],
            income_annum=data['income_annum'],
            loan_amount=data['loan_amount'],
            loan_term=data['loan_term'],
            cibil_score=data['cibil_score'],
            residential_assets_value=data['residential_assets_value'],
            commercial_assets_value=data['commercial_assets_value'],
            luxury_assets_value=data['luxury_assets_value'],
            bank_asset_value=data['bank_asset_value'],
            interest_rate=rate,
            is_approved=is_approved
        )
        
        return render(request, 'bank_app/loan_result.html', {
            'loan': loan,
            'total_assets': total_assets
        })
    
    return render(request, 'bank_app/loan_application.html')