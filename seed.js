var db             = require('./config/db');
var Cause 		   = require('./models/cause');
var Pledge 		   = require('./models/pledge');
var User		   = require('./models/user');

var seedUser;
var seedCause;
User.remove({})
	.then(function(){
    	return Cause.remove();
	})
	.then(function(){
		return Pledge.remove();
	})
 	.then(function(){
  		return User.create([
    		{
                name:'Evan Washington', 
                email:'enavy04@gmail.com', 
                role:'admin', 
                city:'Inglewood', 
                pledges:2, 
                causes:2,
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel commodo magna. Mauris sodales turpis orci, sed luctus elit consectetur ac. Morbi maximus pellentesque augue vel pharetra. In vel ligula eu nibh vulputate eleifend eu quis sapien. Donec ac vestibulum nisl. Ut aliquet at elit et venenatis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus metus felis, fringilla vel diam id, rutrum interdum nisi. Quisque ullamcorper, leo et egestas hend' 
            }
    	]);
  	})
  	.then(function(user){
  		seedUser = user[0];
    	return Cause.create([
            {
                title:'World Peace',
                body:'World peace or peace on Earth is an ideal state of freedom, peace, and happiness among and within all nations and peoples. This ideal of world non-violence provides a basis for peoples and nations to willingly cooperate, either voluntarily or by virtue of a system of governance that prevents warfare.  Taken from the wikipedia article on World Peace',
                creator: user[0]._id,
                creatorName: user[0].name,
                category: 'General',
                createdAt: new Date(),
                expiration: null,
                approved: true
            },
            {
                title:'Bacon Ipsum',
                body:'Bacon ipsum dolor amet sausage turducken flank porchetta pork. Chicken prosciutto chuck flank biltong short loin. Fatback tenderloin ribeye short loin prosciutto boudin pancetta corned beef turducken sirloin. Meatball filet mignon swine shoulder, pork belly bresaola brisket sausage kielbasa pork chop venison prosciutto chuck. Tri-tip kielbasa short ribs doner alcatra pastrami pancetta beef. Short loin corned beef pancetta, cupim drumstick kielbasa boudin pork loin swine shankle cow. Porchetta tr',
                creator: user[0]._id,
                creatorName: user[0].name,
                category: 'General',
                createdAt: new Date(),
                expiration: null,
                approved: true
            },
            {
                title:'Cupcake Ipsum',
                body:'Cupcake ipsum dolor sit amet dragée. Candy icing wafer biscuit muffin lollipop tiramisu. Sweet apple pie jelly. Powder lemon drops liquorice I love I love chocolate bar I love. Chocolate cake icing chupa chups chocolate cake. Croissant chocolate ice cream I love gummies oat cake. Marzipan candy I love I love tiramisu marshmallow sugar plum wafer croissant. Pastry powder liquorice cake marshmallow gummi bears jelly-o. I love marshmallow lemon drops tiramisu carrot cake croissant. Sweet pastry cho',
                creator: user[0]._id,
                creatorName: user[0].name,
                category: 'General',
                createdAt: new Date(),
                expiration: null,
                approved: true
            },
    		{
    			title:'Lorem Ipsum',
    			body:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel commodo magna. Mauris sodales turpis orci, sed luctus elit consectetur ac. Morbi maximus pellentesque augue vel pharetra. In vel ligula eu nibh vulputate eleifend eu quis sapien. Donec ac vestibulum nisl. Ut aliquet at elit et venenatis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus metus felis, fringilla vel diam id, rutrum interdum nisi. Quisque ullamcorper, leo et egestas hend',
    			creator: user[0]._id,
                creatorName: user[0].name,
    			category: 'General',
    			createdAt: new Date(),
    			expiration: null,
    			approved: true
    		},
            {
                title:'Veggie Ipsum',
                body:'Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic. Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini. Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale.',
                creator: user[0]._id,
                creatorName: user[0].name,
                category: 'General',
                createdAt: new Date(),
                expiration: null,
                approved: true
            }
    	]);
    })
    .then(function(cause){
    	seedCause = cause[0];
    	return Pledge.create([
    		{
    			user:seedUser._id,
                userName: seedUser.name,                
                title: seedCause.title,
    			cause:seedCause._id,
    			createdAt: new Date(),
    			pledgeAt: new Date(),
    			howLong: 30
    		},
            {
                user:seedUser._id,
                userName: seedUser.name,
                title:cause[1].title,
                cause:cause[1]._id,
                createdAt: new Date(),
                pledgeAt: new Date(),
                howLong: 90
            }

    	]);

    })
    .catch(function(err){
    	console.log(err);
    })
    .then(function(pledge){
    	process.exit();
    });