from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def home():

    income = 0
    expenses = []
    total_expenses = 0
    savings = 0

    if request.method == "POST":

        income = float(request.form["income"])

        categories = request.form.getlist("category")
        amounts = request.form.getlist("amount")

        for category, amount in zip(categories, amounts):

            if amount:
                expense_amount = float(amount)

                expenses.append({
                    "category": category,
                    "amount": expense_amount
                })

                total_expenses += expense_amount

        savings = income - total_expenses

    return render_template(
        "index.html",
        income=income,
        expenses=expenses,
        total_expenses=total_expenses,
        savings=savings
    )


if __name__ == "__main__":
    app.run(debug=True)