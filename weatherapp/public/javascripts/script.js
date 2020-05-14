// implantation de la map
var mymap = L.map('mapid',
     {
      center: [48.866667, 2.333333],
      zoom: 4
     }
     );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

// definition des parametres lon lat
var lonlat = $('.lonlat')

var imarker = L.icon({
    iconUrl: '/images/leaf-orange.png',
    shadowUrl: '/images/leaf-shadow.png',
    
    iconSize:   [38, 95],
    shadowSize:  [50, 64],
    
    iconAnchor:  [22, 94],
    shadowAnchor: [4, 62],  
    
    popupAnchor: [-3, -76]
    });
// creation marqueur
    lonlat.each  (
        function(){
   var marker = L.marker([$(this).data("lat"),$(this).data("lon")], {icon: imarker}).addTo(mymap);
    marker.bindPopup('Hey '+ $(this).data('name')).openPopup();
        }
    ) 

// popup marqueur
