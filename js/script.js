
console.log(key);
var script = '<script src="https://maps.googleapis.com/maps/api/js?key='+ key +'&callback=initMap&libraries=places&v=weekly" async defer></script>';
console.log(script);

// ==========================================================
// The Map
// ==========================================================

function initMap() {

  // The location of New Zealand
  const wellington = { lat: -41.2489187, lng: 174.7001308 };
  // The map, centered at New Zealand
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: wellington,
  });


  //calculate days
   function dateDiff(){
    var start = $(startDate).datepicker('getDate');
    var end = $(endDate).datepicker('getDate');

    var days = (end-start)/1000/60/60/24; //to get human readable days
    console.log(days);
    return (days);

   }

  function  filterAccommodation(xDays, xGuests, xCity, xMeal){
   console.log(xDays, xGuests, xCity, xMeal);
  var i;
   $('#days').text('Your trip is' + ' ' + xDays + ' ' + 'days');
   $('#people').text('For' + ' ' + xGuests + ' ' + 'guests');
   $('#place').text('In' + ' ' + xCity );
  // $('#meal').text('With' + ' ' + xMeal );
   for ( i  = 0 ; i < accommodation.length; i++) {
     // console.log(i, accommodation[i].name);
     if (( (xDays <= accommodation[i].maxNight) && (xDays >= accommodation[i].minNight)) &&
      ( (xGuests <= accommodation[i].maxGuest) && (xGuests >= accommodation[i].minGuest)) && (xCity === accommodation[i].city)){
       console.log(accommodation[i].name);

// ==========================================================
// Calculate accommodation cost
// ==========================================================

       var totalCost = (accommodation[i].price + (xMeal*xGuests)) * xDays ;
       console.log(totalCost);
       displayAccommodation(i, totalCost);

     }
   }
  }

  // ==========================================================
  // Display accommodation
  // ==========================================================

  function displayAccommodation(j, cost){

    $('#accommodationResults').append ('<div>' +
                          '<img src="images/' + accommodation[j].photo1 + '" class="card-img-top p-3 rounded" alt="' + '">' +
                          '<p class="card-text text-dark font-weight-bold pl-3 pr-3">' + ' ' + '<span>' + accommodation[j].name + '</span> <br></p>' +
                          '<p class="card-text text-dark font-weight-normal pl-3 pr-3">' + ' ' + '<span>' + accommodation[j].description + '</span> <br></p>' +
                          '<div class="text-center text-dark iconFacilities">' + ' ' + '<span>' + accommodation[j].facilities + '</span> <br></p>' +
                          '<div class="text-center display-2">$'+ ' ' + '<span>' + accommodation[j].price + ' per night </span> <br></p>' +
                          '<div class="mb-3">Total cost : $ ' + cost + '</div>'+
                          '<button type="button" class="btn btn-warning font-weight-bold text-white moreDetails" data-toggle="modal" data-target="#exampleModal">BOOK NOW</button>' +
                          '<div class="pt-3 mx-auto separationLine"></div>' +

                          '</div>'
                          ); //append ends here

   }; //displayCards


  $('#search').click(function(){
    var days = dateDiff();
    var guests = parseInt($('#guests').val());
    var city = $('#city').val();
    var meal = parseInt($('#meal').val());
    console.log(days, guests, city, meal);
    filterAccommodation(days,guests, city, meal);
    var i;

      for ( i  = 0 ; i < accommodation.length; i++) {
        // console.log(i, accommodation[i].name);
        if (( (days <= accommodation[i].maxNight) && (days >= accommodation[i].minNight)) &&
         ( (guests <= accommodation[i].maxGuest) && (guests >= accommodation[i].minGuest)) && (city === accommodation[i].city)){
          console.log(accommodation[i].name);
          var location = { lat : accommodation[i].latitude, lng: accommodation[i].longitude}
          // The marker, positioned at Uluru
          const marker = new google.maps.Marker({
            position: location,
            map: map,
          });

        }
      }
  });
}

// ==========================================================
// Accommodation Objects
// ==========================================================

var accommodation = [
  {
    id: 1,
    type: 'Hotel',
    name: 'Jet Park Hotel Auckland Airport',
    city: 'Auckland',
    price: 157,
    minGuest: 1,
    maxGuest: 2,
    minNight: 1,
    maxNight: 5,
    latitude: -36.978880,
    longitude: 174.786560,
    photo1:'Hotel-01-Auckland.jpg',
    photo2:'Hotel-02-Auckland.jpg',
    photo3:'Hotel-03-Auckland.jpg',
    description:'You can relax and refresh in luxury to prepare or recover from your journey and to refuel, dine on the best cuisine in our award winning' +
                'Te Maroro Restaurant. Modern, comfortable and quiet rooms with superb service and facilities - a few reasons why guests return to us time and again.',
    facilities: '<i class="fas fa-wifi"></i>' + ' ' + '<i class="fas fa-dumbbell"></i>' + ' ' + '<i class="fas fa-swimming-pool"></i>'
  },

  {
    id: 2,
    type: 'Hostel',
    name: 'YMCA Hostel',
    city: 'Auckland',
    price: 30,
    minGuest: 1,
    maxGuest: 1,
    minNight: 1,
    maxNight: 10,
    latitude: -36.854630,
    longitude: 174.758790,
    photo1:'Hostel-01-Auckland.jpg',
    photo2:'Hostel-02-Auckland.jpg',
    photo3:'Hostel-03-Auckland.jpg',
    description:'Relax and enjoy the convenience of YMCA Hostel. Recently refurbished, it offers a range of clean and comfortable rooms,' +
                '(including dorm and family rooms) at affordable prices. All rooms offer plenty of natural light, opening windows and either a city',
    facilities: '<i class="fas fa-wifi"></i>' + ' ' + '<i class="fas fa-tshirt"></i>' + ' ' + '<i class="fas fa-suitcase-rolling"></i>'
  },

  {
    id: 3,
    type: 'Motel',
    name: 'Port Waikato Holiday Park',
    city: 'Auckland',
    price: 90,
    minGuest: 2,
    maxGuest: 4,
    minNight: 3,
    maxNight: 10,
    latitude: -37.392170,
    longitude: 174.723170,
    photo1:'Motel-01-Auckland.jpg',
    photo2:'Motel-02-Auckland.jpg',
    photo3:'Motel-03-Auckland.jpg',
    description:'Our motel are comfortable and modern self-contained units with open plan kitchen, dining, lounge and deck.' +
                ' They are located in the heart of the Port Waikato Holiday Park - our peaceful haven from everyday life.',
    facilities: '<i class="fas fa-wifi"></i>' + ' ' + '<i class="fas fa-tshirt"></i>' + ' ' + '<i class="fas fa-tv"></i>'

  },

  {
    id: 4,
    type: 'House',
    name: 'Alymerton - Akaroa Holiday Home',
    city: 'Auckland',
    price: 240,
    minGuest: 1,
    maxGuest: 4,
    minNight: 2,
    maxNight: 15,
    latitude: -36.853990,
    longitude: 174.778770,
    photo1:'House-01-Auckland.jpg',
    photo2:'House-02-Auckland.jpg',
    photo3:'House-03-Auckland.jpg',
    description:'Alymerton is a 3 bedroom holiday home, located on an Akaroa hilltop - a serene setting is perfect for your next escape.' +
                ' This 2 storey home includes 3 well-appointed, charming bedrooms and all the basics for a fuss free stay!',
    facilities: '<i class="fas fa-wifi"></i>' + ' ' + '<i class="fas fa-tshirt"></i>' + ' ' + '<i class="fas fa-warehouse"></i>'

  },

  {
    id: 5,
    type: 'Hotel',
    name: 'Grand Mercure Wellington',
    city: 'Wellington',
    price: 157,
    minGuest: 1,
    maxGuest: 2,
    minNight: 1,
    maxNight: 5,
    latitude: -41.284010,
    longitude: 174.774320,
    photo1:'Hotel-01-Wellington.jpg',
    photo2:'Hotel-02-Wellington.jpg',
    photo3:'Hotel-03-Wellington.jpg',
    description:'Overlooking the Cuban quarter, tucked away between the scenic hills of Wellington, the Grand Mercure Wellington embodies' +
                'all of these features to tell the story of New Zealand and the coolest little capital.',
    facilities: '<i class="fas fa-dumbbell"></i>' + ' ' + '<i class="fas fa-luggage-cart"></i>' + ' ' + '<i class="fas fa-glass-cheers"></i>'
  },

  {
    id: 6,
    type: 'Hostel',
    name: 'The Setup on Dixon',
    city: 'Wellington',
    price: 30,
    minGuest:1 ,
    maxGuest: 1,
    minNight: 1,
    maxNight: 10,
    latitude: -41.2923477,
    longitude: 174.775906,
    photo1:'Hostel-01-Wellington.jpg',
    photo2:'Hostel-02-Wellington.jpg',
    photo3:'Hostel-03-Wellington.jpg',
    description:'The Setup on Dixon is perfect for budget conscious travellers. Book short or long term cheap' +
                'accommodation in central Wellington and save for more exciting things.',
    facilities: '<i class="fas fa-wifi"></i>' + ' ' + '<i class="fas fa-tshirt"></i>' + ' ' + '<i class="fas fa-tv"></i>'
  },

  {
    id: 7,
    type: 'Motel',
    name: 'Capital Gateway Motor Inn',
    city: 'Wellington',
    price: 90,
    minGuest: 2,
    maxGuest: 4,
    minNight: 3,
    maxNight: 10,
    latitude: -41.231227,
    longitude: 174.8086092,
    photo1:'Motel-01-Wellington.jpg',
    photo2:'Motel-02-Wellington',
    photo3:'Motel-03-Wellington',
    description:'Located just 10 minutes from Wellington CBD, Captial Gateway Motor Inn offers the friendly and spacious atmosphere you would expect from a country motor lodge.',
    facilities: '<i class="fas fa-tshirt"></i>' + ' ' + '<i class="fas fa-glass-cheers"></i>' + ' ' + '<i class="fas fa-luggage-cart"></i>'
  },

  {
    id: 8,
    type: 'House',
    name: 'Central City Apartment',
    city: 'Wellington',
    price: 240,
    minGuest: 1,
    maxGuest: 4,
    minNight: 2,
    maxNight: 15,
    latitude: -41.298512,
    longitude: 174.7711245,
    photo1:'House-01-Wellington.png',
    photo2:'House-02-Wellington.png',
    photo3:'House-03-Wellington.png',
    description:'A great modern apartment conveniently located at the end of Cuba Street in downtown Wellington. Within walking distance to city shops,' +
                'top restaurants, theatres and events centres, this apartment offers a superb accommodation solution in the capital.',
    facilities: '<i class="fas fa-wifi"></i>' + ' ' + '<i class="fas fa-cat"></i>' + ' ' + '<i class="fas fa-warehouse"></i>'
  },

  {
    id: 9,
    type: 'Hotel',
    name: 'Distinction Christchurch Hotel',
    city: 'Christchurch',
    price: 157,
    minGuest: 1,
    maxGuest: 2,
    minNight: 1,
    maxNight: 5,
    latitude: -43.5314721,
    longitude: 172.635419,
    photo1:'Hotel-01-Christchurch.jpg',
    photo2:'Hotel-02-Christchurch.jpg',
    photo3:'Hotel-03-Christchurch.jpg',
    description:'100% NZ Owned & Operated. The luxurious 4.5 star hotel is centrally located in the revitalised Cathedral Square and offers 179 elegant,' +
                'air-conditioned hotel rooms including 3 floors of new Superior Rooms & Suites & free unlimited WiFi.',
    facilities: '<i class="fas fa-dumbbell"></i>' + ' ' + '<i class="fas fa-concierge-bell"></i>' + ' ' + '<i class="fas fa-luggage-cart"></i>'
  },

  {
    id: 10,
    type: 'Hostel',
    name: 'All Stars Inn on Bealey',
    city: 'Christchurch',
    price: 30,
    minGuest: 1,
    maxGuest: 1,
    minNight: 1,
    maxNight: 10,
    latitude: -43.5204168,
    longitude: 172.6420698,
    photo1:'Hostel-01-Christchurch.jpg',
    photo2:'Hostel-02-Christchurch.jpg',
    photo3:'Hostel-03-Christchurch.jpg',
    description:'All Stars Inn on Bealey, a purpose built complex with your comfort and enjoyment in mind.',
    facilities: '<i class="fas fa-wifi"></i>' + ' ' + '<i class="fas fa-tv"></i>' + ' ' + '<i class="fas fa-tshirt"></i>'
  },

  {
    id: 11,
    type: 'Motel',
    name: 'City Central Motel Apartments',
    city: 'Christchurch',
    price: 90,
    minGuest: 2,
    maxGuest: 4,
    minNight: 3,
    maxNight: 10,
    latitude: -43.5324248,
    longitude: 172.6437552,
    photo1:'Motel-01-Christchurch.jpg',
    photo2:'Motel-02-Christchurch.jpg',
    photo3:'Motel-03-Christchurch.jpg',
    description:'Comfort and convenience in a great location is our motto and along with fantastic service and spotlessly clean rooms, that is what we provide',
    facilities: '<i class="fas fa-wifi"></i>' + ' ' + '<i class="fas fa-tshirt"></i>' + ' ' + '<i class="fas fa-tv"></i>'
  },

  {
    id: 12,
    type: 'House',
    name: 'Luxury Home in Christchurch CBD',
    city: 'Christchurch',
    price: 240,
    minGuest: 1,
    maxGuest: 4,
    minNight: 2,
    maxNight: 15,
    latitude: -43.5443383,
    longitude: 172.628252,
    photo1:'House-01-Christchurch.jpg',
    photo2:'House-02-Christchurch.jpg',
    photo3:'House-03-Christchurch.jpg',
    description:'Nestled in a prime location, this stunning 3 story apartment offers you a chance to enjoy the best of CHCH city',
    facilities: '<i class="fas fa-wifi"></i>' + ' ' + '<i class="fas fa-cat"></i>' + ' ' + '<i class="fas fa-warehouse"></i>'
    },

  {
    id: 13,
    type: 'Hotel',
    name: 'Millennium Hotel Queenstown',
    city: 'Queenstown',
    price: 157,
    minGuest: 1,
    maxGuest: 2,
    minNight: 1,
    maxNight: 5,
    latitude: -45.0339687,
    longitude: 168.6647232,
    photo1:'Hotel-01-Queenstown.jpg',
    photo2:'Hotel-02-Queenstown.jpg',
    photo3:'Hotel-03-Queenstown.jpg',
    description:'Located near the shores of Lake Wakatipu and surrounded by the Southern Alps, Millennium Hotel provides spellbinding' +
                '4-star Plus luxury coupled with timeless elegance. Guest facilities include 220 rooms, gym, sauna, spa, bar and restaurant.',
    facilities: '<i class="fas fa-dumbbell"></i>' + ' ' + '<i class="fas fa-swimming-pool"></i>' + ' ' + '<i class="fas fa-glass-cheers"></i>'
  },

  {
    id: 14,
    type: 'Hostel',
    name: 'YHA Queenstown Central',
    city: 'Queenstown',
    price: 30,
    minGuest: 1,
    maxGuest: 1,
    minNight: 1,
    maxNight: 10,
    latitude: -45.0320268,
    longitude: 168.6567616,
    photo1:'Hostel-01-Queenstown.jpg',
    photo2:'Hostel-02-Queenstown.jpg',
    photo3:'Hostel-03-Queenstown.jpg',
    description:'Fully equipped hostel. Heated rooms, ski storage area. Friendly, helpful staff. Double and multi-share' +
                'rooms available. Fantastic views over Lake Wakatipu from upstairs lounge.',
    facilities: '<i class="fas fa-wifi"></i>' + ' ' + '<i class="fas fa-luggage-cart"></i>' + ' ' + '<i class="fas fa-glass-cheers"></i>'

  },

  {
    id: 15,
    type: 'Motel',
    name: 'Caples Court Motel',
    city: 'Queenstown',
    price: 90,
    minGuest: 2,
    maxGuest: 4,
    minNight: 3,
    maxNight: 10,
    latitude: -45.0326865,
    longitude: 168.6625164,
    photo1:'Motel-01-Queenstown.jpg',
    photo2:'Motel-02-Queenstown.jpg',
    photo3:'Motel-03-Queenstown.jpg',
    description:'Caples Court Motel offers non-smoking accommodation in Queenstown centre, just a short stroll from the lakefront.' +
                'Guests enjoy amazing views of mountains and Queenstown Bay from their rooms.',
    facilities: '<i class="fas fa-wifi"></i>' + ' ' + '<i class="fas fa-tv"></i>' + ' ' + '<i class="fas fa-glass-cheers"></i>'

  },

  {
    id: 16,
    type: 'House',
    name: 'Queenstown Peaks',
    city: 'Queenstown',
    price: 240,
    minGuest: 1,
    maxGuest: 4,
    minNight: 2,
    maxNight: 15,
    latitude: -45.0312412,
    longitude: 168.6654484,
    photo1:'House-01-Queenstown.jpg',
    photo2:'House-02-Queenstown.jpg',
    photo3:'House-03-Queenstown.jpg',
    description:'Queenstown Peaks is a 3 bedroom, 2 bathroom Queenstown holiday home. Offering fantastic lake and mountain views,' +
                'this peaceful holiday home at the end of a quiet lane enjoys a serene outlook!',
    facilities: '<i class="fas fa-wifi"></i>' + ' ' + '<i class="fas fa-concierge-bell"></i>' + ' ' + '<i class="fas fa-cat"></i>'

  }
];

// ==========================================================
// Home Photos Carousel
// ==========================================================

$(document).ready(function(){

var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1};
  x[myIndex-1].style.display = "block";
  setTimeout(carousel, 5000); // Change image every 5 seconds
}

// ==========================================================
// Calendar
// ==========================================================

//for map script to be added to body
$('body').append(script);

 $('#startDate').datepicker({
   dateFormat : 'yy-mm-dd',
   changeMonth : true,
   minDate :new Date(),
   maxDate : '+1y',
   onSelect : function(date){
     var selectDate = new Date(date);
     var msecInADay  = 86400000;
     var stDate = new Date(selectDate.getTime() + msecInADay);

//set minimun date
     $('#endDate').datepicker('option', 'minDate', stDate);
     var enDate = new Date(selectDate.getTime() + 15 * msecInADay);

     $('#endDate').datepicker('option', 'maxDate', enDate);

   }

 });

 $('#endDate').datepicker({
   dateFormat : 'yy-mm-dd',
   changeMonth : true
 });

// ==========================================================
// Validation form
// ==========================================================

// function validateForm() {
//   var x = document.forms("bookingForm").value;
//   if (x == "") {
//     alert("Missing Information!, all field are required");
//     return false;
//   }
// }


 // ==========================================================
// Modal Accommodation  ????????????????????????????????????????????????????????????????
// ==========================================================

function cardModal(){
  $('.moreDetails').click(function(){
  $('#accommodationPhoto').text(' '); //clearing the content

    var accommodation = '';
    var i = 0;
    for (i = 0; i < accommodation.length; i++) {
      if (parseInt(this.id) === accommodation[i].id) {
      type = accommodation[i].type;
          $('#exampleModal').text(accommodation[i].name);
          //append will keep  adding to existing content, so clear if you want
          //or else use html to replace existing content
          $('#accommodationPhoto').append('<img class="img-fluid" src="images/' + accomodation[i].photo1 + '" alt="' + accommodation[i].name + '"/>' +
          '<p class="text-danger">'+ accommodation[i].detail +'</p>');

      } //end of if statement

    }//end of for statement

  }); // end of moreDetails click event

} //cardModal



}); //document.ready()
