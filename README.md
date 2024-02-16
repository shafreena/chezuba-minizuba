Terminology:
Orderline - A customer can order multiple products of different quantities. All similar products would be marked as one orderline and the quantity would be mentioned on the orderline entry.
Package type - The type of packaging each item in orderline needs. This is unique for a particular orderline entry.
Context:
Minizuba is a packaging solution startup. The “Packaging Supervisor” at Minizuba receives a list of the products that need to be packed through an API endpoint. Then a list of items is distributed to each packaging team depending on the type of package. Navigating the API poses challenges for the supervisor.

Developed an application that displays all the orderlines(based on type) on UI.

Features:
Packaging orders displayed in a list view
“OrderLineID” as the first column(extreme left)
Items sorted in ascending order of “OrderLineID”
Ability to filter by “Quantity”
Grouping by “OrderID”
Rich and responsive UI
Color code each package type.
