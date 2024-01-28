<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<style>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 3rem;
    }

    .header h1 {
        font-size: 2rem;
    }

    .header p {
        font-size: 1.4rem;

    }

    .header img {
        width: 128px;
        height: 128px;
    }

    .table-container {
        justify-content: center;
        display: flex;
        margin-top: 10px;
        flex-direction: column;
        align-items: center;
    }

    #item_table {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    #item_table_header {
        font-family: Arial, Helvetica, sans-serif;
        width: 100%;
    }

    #item_table td,
    #item_table th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    #item_table tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    #item_table tr:hover {
        background-color: #ddd;
    }

    #item_table th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #04AA6D;
        color: white;
    }

    .total_container td {
        padding: 0 32px;
    }

    .total_container h1,
    h2 {
        font-weight: bold;
        font-size: 3rem;
    }
</style>

<body>
    <section class="header">
        <table id="item_table_header">
            <tr>
                <td>
                    <h1>From</h1>
                    <p>Shop: Thanh Shop</p>
                    <p>Address: Japan</p>
                    <p>Phone: 123-456-7890</p>
                </td>
                <td>
                    <h1>To</h1>
                    <p>Customer: Alice</p>
                    <p>Address: America</p>
                    <p>Phone: 123-456-7890</p>
                </td>
                <td>
                    <div>
                        <img src="{{ public_path('/images/logo.png') }}">
                    </div>
                </td>
            </tr>

        </table>

    </section>
    <div class="table-container">
        <table id="item_table">
            <tr>
                <th>Name</th>
                <th>Cost</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
            @php
                $order = isset($order) ? $order : [];
            @endphp
            @foreach ($order as $value)
            <tr>
                <td>{{$value["name"]}}</td>
                <td>{{ $value["cost"] }}</td>
                <td>{{ $value["order_amount"] }}</td>
                <td>{{ $value["subTotal"] }}</td>
            </tr>
            @endforeach
        </table>
        <hr style="width: 80%; margin-top: 30px;">
        <table class="total_container">
            <tr>
                <td>
                    <h1>Total</h1>
                </td>
                <td>
                    @php
                        $total = 0;
                        foreach ($order as $value) {
                            $total += intval($value['subTotal']);
                            $formattedTotal = number_format(filter_var($total, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION), 2, '.', ',');

                        }
                    @endphp
                    <h1>{{$formattedTotal}}$</h1>
                </td>
            </tr>
        </table>
    </div>

</body>

</html>