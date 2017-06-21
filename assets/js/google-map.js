function initMap() {
  var styleArray = [
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#f99531"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "gamma": "0.50"
            },
            {
                "hue": "#ff4a00"
            },
            {
                "lightness": "-79"
            },
            {
                "saturation": "-86"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ff1700"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "color": "#e74231"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#4d6447"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "color": "#f0ce41"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "color": "#363f42"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "color": "#231f20"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6c5e53"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": "#313639"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text",
        "stylers": [
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#0e171d"
            }
        ]
    }
  ];
 
  if (matchMedia) {
    var mq = window.matchMedia("(min-width: 1024px)");
    var zoom;
    mq.addListener(WidthChange2);
    WidthChange2(mq);
    function WidthChange2(){
        if(mq.matches) {
          zoom = 8;
          lng = 84.767141;
        } else {
          zoom = 7;
          lng = 83.267141;
        }
    }
  }
  var map = document.getElementById('google-map');
  if(map) {
    var map = new google.maps.Map(map, {
      zoom: zoom,
      center: {lat: 53.512077, lng: lng},
      disableDefaultUI: true,
      styles: styleArray,
      scrollwheel: false
    });
    var image ='assets/images/map-logo.png'
    var filials = [
      new google.maps.LatLng(53.362077, 83.767141),
      new google.maps.LatLng(53.441453, 83.920497),
      new google.maps.LatLng(53.557427, 83.839596),
      new google.maps.LatLng(52.506859, 85.146535),
      new google.maps.LatLng(52.493591, 82.780864),
      new google.maps.LatLng(53.780872, 81.313926)
    ];
    filials.forEach(function(filial) {
      var marker = new google.maps.Marker({
        position: filial,
        icon: image,
        map: map
      });
    });
  }

  //contacts map
  var map_contacts = document.getElementById('google-map-contacts');
  if(map_contacts){
    var geocoder = new google.maps.Geocoder();
    var map_contacts = new google.maps.Map(map_contacts, {
      zoom: 17,
      center: {lat: 53.332262, lng: 83.775992},
      disableDefaultUI: true
    });
    var address = document.getElementById('contact-address').textContent;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map_contacts.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map_contacts,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
