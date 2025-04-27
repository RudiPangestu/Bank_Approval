from django.db import models

class LoanApplication(models.Model):
    EDUCATION_CHOICES = [
        ('graduate', 'Graduate'),
        ('post_graduate', 'Post Graduate'),
        ('doctorate', 'Doctorate'),
        ('other', 'Other'),
    ]
    
    SELF_EMPLOYED_CHOICES = [
        ('yes', 'Yes'),
        ('no', 'No'),
    ]

    no_of_dependents = models.IntegerField()
    education = models.CharField(max_length=20, choices=EDUCATION_CHOICES)
    self_employed = models.CharField(max_length=3, choices=SELF_EMPLOYED_CHOICES)
    income_annum = models.DecimalField(max_digits=12, decimal_places=2)
    loan_amount = models.DecimalField(max_digits=12, decimal_places=2)
    loan_term = models.IntegerField()
    cibil_score = models.IntegerField()
    residential_assets_value = models.DecimalField(max_digits=12, decimal_places=2)
    commercial_assets_value = models.DecimalField(max_digits=12, decimal_places=2)
    luxury_assets_value = models.DecimalField(max_digits=12, decimal_places=2)
    bank_asset_value = models.DecimalField(max_digits=12, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    is_approved = models.BooleanField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Loan Application {self.id} - Amount: {self.loan_amount}"