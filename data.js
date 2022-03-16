const pizzaData = {
   base:[
       {
        id:"baseCB",
        name: "Cheese burst",
        image: "https://www.dominos.co.in/files/items/_1346164951.jpg",
        description: "Crust with oodles of yummy liquid cheese filled inside.",
        price: 170
       },
       {
        id:"baseFPC",   
        name: "Fresh pan crust",
        image: "https://www.dominos.co.in/files/items/FPP_(1).jpg",
        description: "Tastiest Pan Pizza.Ever. Domino’s freshly made pan-baked pizza; deliciously soft,buttery,  cheesy and delightfully crunchy.",
        price: 150
       },
       {
        id:"baseWTC",
        name: "Wheat thin crust",
        image: "https://www.dominos.co.in/files/items/thin-crust.jpg",
        description: "Presenting the light healthier and delicious light wheat thin crust from Dominos.",
        price: 120
       },
       {
        id:"baseNHT",   
        name: "New hand tossed",
        image: "https://www.dominos.co.in/files/items/Crust_272X272.jpg",
        description: "Classic Domino's crust. Fresh, hand stretched.",
        price: 80
       },
       {
        id:"baseCHT",
        name: "Classic hand tossed",
        image: "https://www.dominos.co.in/files/items/_1346165278.jpg",
        description: "Dominos traditional hand stretched crust, crisp on outside, soft & light inside.",
        price: 100
       }
       ],
   sauce:[
       {
        id:"sauceTTS",
        name: "Tangy tomato sauce",
        image: "https://www.dogtownpizza.com/wp-content/uploads/2016/04/Ingredients-Pizza-_0004_Sauce.png",
        price: 10
       },
       {
        id:"saucePS",
        name: "Pesto sauce",
        image: "https://www.dogtownpizza.com/wp-content/uploads/2018/02/pesto-sauce.jpg",
        price: 15
       },
       {
        id:"sauceBS",
        name: "Barbeque sauce",
        image: "https://www.dogtownpizza.com/wp-content/uploads/2020/05/barbeque-sauce-picture-id521294143-768x512.jpg",
        price: 25
       },
       {
        id:"saucePRS",
        name: "Peppery red sauce",
        image: "https://www.dogtownpizza.com/wp-content/uploads/2018/02/red-sauce-on-pizza-768x512.jpg",
        price: 20
       },
       {
        id:"sauceSRS",
        name: "Spicy red sauce",
        image: "https://www.dogtownpizza.com/wp-content/uploads/2020/05/raw-dough-for-pizza-with-ingredient-tomato-sauce-mozzarella-tomatoes-picture-id667079158.jpg",
        price: 25
       },
       ],
   cheese:[
       {
        id:"cheeseLMM",
        name: "Low-moisture mozzarella",
        image: "https://images.kitchenstories.io/wagtailOriginalImages/2cheesy-kitchenstories.png",
        price: 40
       },
       {
        id:"cheeseBM",
        name: "Buffalo mozzarella",
        image: "https://images.kitchenstories.io/wagtailOriginalImages/1mozzarella-kitchen-stories.png",
        price: 30
       },
       {
        id:"cheeseB",
        name: "Burrata",
        image: "https://images.kitchenstories.io/wagtailOriginalImages/7burrata-kitchen-stories.png",
        price: 60
       },
       {
        id:"cheeseT",
        name: "Taleggio",
        image: "https://images.kitchenstories.io/wagtailOriginalImages/5taleggio-kitchen-stories.png",
        price: 30
       },
       {
        id:"cheeseG",
        name: "Gruyère",
        image: "https://images.kitchenstories.io/wagtailOriginalImages/4gruyere-kitchen-stories.png",
        price: 35
       },
       ],
   vegToppings:[
       {
        id:"v_toppingsSC",
        name: "Sweet corn",
        image: "https://www.crazymasalafood.com/wp-content/images/golden-1.jpg",
       },
       {
        id:"v_toppingsJO",
        name: "Jalepeno & Olives",
        image: "https://www.crazymasalafood.com/wp-content/images/jalepeno.jpg",
       },
       {
        id:"v_toppingsBCC",
        name: "Baby corn & Capsicum",
        image: "https://www.crazymasalafood.com/wp-content/images/herby.png",
       },
       {
        id:"v_toppingsM",
        name: "Mushroom",
        image: "https://www.crazymasalafood.com/wp-content/images/deluxe-1.jpg",
       },
       {
        id:"v_toppingsPT",
        name: "Paneer tandoori",
        image: "https://www.crazymasalafood.com/wp-content/images/pannerr.jpg",
       },
       ],
   nonVegToppings:[
       {
        id:"nv_toppingsGBP",
        name: "Garlic butter prawns",
        image: "https://www.recipetineats.com/wp-content/uploads/2020/05/Prawn-Pizza_1.jpg",
       },
       {
        id:"v_toppingsSK",
        name: "Sausage & Kale",
        image: "https://www.recipetineats.com/wp-content/uploads/2020/05/Sausage-and-kale-pizza.jpg",
       },
       {
        id:"v_toppingsPR",
        name: "Prosciutto and rocket",
        image: "https://www.recipetineats.com/wp-content/uploads/2020/05/Proscuitto-Rocket-Pizza.jpg",
       },
       {
        id:"v_toppingsBB",
        name: "Beef & Bacon",
        image: "https://www.recipetineats.com/wp-content/uploads/2020/05/Meatlovers-1.jpg",
       }
       ],
   availableMaterial:{
        crust:10,
        sauce:7,
        cheese:12,
        vegToppings:15,
        nonvegToppings:20,
    },
    thresholdMaterials:{
        count:5,
    }    
}
