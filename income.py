import tkinter as tk

class IncomeTaxCalculator:

    def __init__(self, master):
        self.master = master
        master.title("Income Tax Calculator")

        # Label and Entry for Salary/Pension income
        self.salary_label = tk.Label(master, text="Salary/Pension Income:")
        self.salary_label.grid(row=0, column=0, sticky="w")
        self.salary_entry = tk.Entry(master)
        self.salary_entry.grid(row=0, column=1)

        # Label and Entry for Capital Gain income
        self.capital_gain_label = tk.Label(master, text="Capital Gain Income:")
        self.capital_gain_label.grid(row=1, column=0, sticky="w")
        self.capital_gain_entry = tk.Entry(master)
        self.capital_gain_entry.grid(row=1, column=1)

        # Label and Entry for Other income
        self.other_income_label = tk.Label(master, text="Other Income:")
        self.other_income_label.grid(row=2, column=0, sticky="w")
        self.other_income_entry = tk.Entry(master)
        self.other_income_entry.grid(row=2, column=1)

        # Radio button for Senior Citizenship status
        self.senior_citizen_var = tk.IntVar()
        self.senior_citizen_checkbutton = tk.Checkbutton(master, text="Senior Citizen", variable=self.senior_citizen_var)
        self.senior_citizen_checkbutton.grid(row=3, column=0, sticky="w")

        # Button to calculate and display income tax
        self.calculate_button = tk.Button(master, text="Calculate", command=self.calculate_income_tax)
        self.calculate_button.grid(row=4, column=1)

        # Label to display income tax
        self.income_tax_label = tk.Label(master, text="")
        self.income_tax_label.grid(row=5, column=0, columnspan=2)

    def calculate_income_tax(self):
        # Get income values from Entry widgets
        salary_income = float(self.salary_entry.get())
        capital_gain_income = float(self.capital_gain_entry.get())
        other_income = float(self.other_income_entry.get())

        # Calculate income tax based on the rules
        salary_tax = salary_income * 0.15
        if capital_gain_income >= 1:
            if capital_gain_income >= 365:
                capital_gain_tax = capital_gain_income * 0.1
            else:
                capital_gain_tax = capital_gain_income * 0.33
        else:
            capital_gain_tax = 0
        if other_income <= 100000:
            other_income_tax = other_income * 0.15
        else:
            other_income_tax = (100000 * 0.15) + ((other_income - 100000) * 0.26)

        # Apply Senior Citizenship exemption if selected
        if self.senior_citizen_var.get() == 1:
            salary_tax *= 0.8
            capital_gain_tax *= 0.8
            other_income_tax *= 0.8

        # Calculate total income tax
        total_income_tax = salary_tax + capital_gain_tax + other_income_tax

        # Update income tax label
        self.income_tax_label.config(text=f"Total Income Tax: ${total_income_tax:,.2f}")


# Create and run the GUI application
root = tk.Tk()
income_tax_calculator = IncomeTaxCalculator(root)
root.mainloop()
