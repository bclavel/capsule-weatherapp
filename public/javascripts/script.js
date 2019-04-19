var mymap = L.map('worldmap',
      {
       center: [46.52863469527167, 2.43896484375],
       zoom: 5
      }
      );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);


var customIcon = L.icon({
  iconUrl: '../images/leaf-green.png',
  shadowUrl: '../images/leaf-shadow.png',

  iconSize:   [38, 95],
  shadowSize:  [50, 64],

  iconAnchor:  [22, 94],
  shadowAnchor: [4, 62],

  popupAnchor: [-3, -76]
});

var listVille = document.getElementsByClassName('ville')

for (var i = 0; i < listVille.length; i++) {
  L.marker([listVille[i].dataset.lat, listVille[i].dataset.lon], {icon: customIcon}).addTo(mymap).bindPopup(listVille[i].textContent);
}
