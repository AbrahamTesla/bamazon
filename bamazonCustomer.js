const inquirer = require('inquirer');
const mysql = require('mysql');

var connection =mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    database: "Bamazon",
    password: "root"
});

function validateInput(e){
    var int = Number.isInteger(parseFloat(e));
    var sign = Math.sign(e);
    if(int &&(sign ===1)){
        return true;
    }else{
        return "Please enter a whole non-zero number";
    };
};

let displayInventory = ()=>{
    connection.query("select * from products", function(err,res){
        if(err)
        throw(err)
        for(let i=0;i<res.length;i++){
            console.log("------------------");
            console.log("Item ID: "+ res[i].item_id);
            console.log("Product Name: "+res[i].product_name);
            console.log("Department Name: "+res[i].department_name);
            console.log("Price: "+res[i].price);
            console.log("Stock Quantity: "+ res[i].stock_quantity);
        };
        promptPurchase();
    });
};

let promptPurchase=() => {
    inquirer.prompt([
        {
            type:'input',
            name:'item_id',
            message:'Please enter Item ID that you would like to purchase',
            validate: validateInput,
            filter: Number
        },
        {
            type: "input",
            name: "quantity",
            message:"How many items are you buying?",
            validate: validateInput,
            filter: Number

        }
    ]).then(function(input){
        let item = input.item_id;
        let quantity =input.quantity;
        
        let queryStr = "SELECT * FROM products WHERE ?";

        connection.query(queryStr, {item_id: item}, function(err, result){
            if(err) throw err;

            if(result.length===0){
                console.log("Invalid Item ID. Please select correct Item ID");
                displayInventory();
            }else{
                let productInput = result[0];
                console.log(result);
                if(quantity<=productInput.stock_quantity){
                    console.log(productInput.product_name + 
                " is in stock. Placing order!");

                var updateQueryStr = "UPDATE products SET stock_quantity ="+(productInput.stock_quantity-quantity)+ " WHERE Item_id = "+ item;

                //test it out 
                console.log("updateQueryStr: "+updateQueryStr);

                connection.query(updateQueryStr,function(err,result){
                    if(err) throw err;
                    
                    console.log("Your order is placed!");


                })
                }
            }
        })
    })
}

displayInventory();