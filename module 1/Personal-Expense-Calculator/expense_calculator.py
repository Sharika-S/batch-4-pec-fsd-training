# Personal Expense Calculator

def get_expenses():
    expenses = []

    while True:
        print("\nExpense Categories")
        print("1. Food")
        print("2. Transport")
        print("3. Education")
        print("4. Shopping")
        print("5. Entertainment")
        print("6. Other")

        choice = input("Enter category number: ")

        categories = {
            "1": "Food",
            "2": "Transport",
            "3": "Education",
            "4": "Shopping",
            "5": "Entertainment",
            "6": "Other"
        }

        if choice not in categories:
            print("Invalid category. Try again.")
            continue

        amount = float(input("Enter expense amount: "))

        expenses.append({
            "category": categories[choice],
            "amount": amount
        })

        more = input("Do you want to add another expense? (yes/no): ")

        if more.lower() != "yes":
            break

    return expenses


def calculate_total(expenses):
    total = 0

    for expense in expenses:
        total += expense["amount"]

    return total


def display_report(income, expenses):
    total_expenses = calculate_total(expenses)
    savings = income - total_expenses

    print("\n================================")
    print("       EXPENSE SUMMARY REPORT")
    print("================================")

    print(f"Income          : ₹{income:.2f}")
    print(f"Total Expenses  : ₹{total_expenses:.2f}")
    print(f"Savings         : ₹{savings:.2f}")

    print("\nExpense Details:")

    for expense in expenses:
        print(f"{expense['category']} : ₹{expense['amount']:.2f}")

    print("================================")


def main():
    print("================================")
    print("    PERSONAL EXPENSE CALCULATOR")
    print("================================")

    income = float(input("Enter your monthly income: ₹"))

    expenses = get_expenses()

    display_report(income, expenses)


main()