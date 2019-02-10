document.onload = (() => {
  setTimeout(() => {
    console.log('Loaded addon');

    // get saved photo locations
    const savedPhotoElements = document.querySelectorAll('.v1Nh3.kIKUG._bz0w');
    console.log(savedPhotoElements);

    const photosToVisit = [];
    savedPhotoElements.forEach(element => {
      photosToVisit.push({
        element: element,
        visited: false,
      });
    });

    const visitElement = (photoArray, index) => {
      const photo = photoArray[index];
      if (photo) {
        photo.element.firstChild.firstChild.click();
        setTimeout(() => {
          const locationLinkBtn = document.querySelector(
            'body > div._2dDPU.vCf6V > div.zZYga > div > article > header > div.o-MQd > div.M30cS > a'
          );
          if (locationLinkBtn) {
            const locationUrl = locationLinkBtn.getAttribute('href');
            console.log(locationUrl);
            fetch(locationUrl)
              .then(res => res.text())
              .then(locationPage => {
                const latitudeSearchString = '<meta property="place:location:latitude" content="';
                const latitudeStart = locationPage.indexOf(latitudeSearchString) + latitudeSearchString.length;
                const latitudeEnd = locationPage.indexOf('"', latitudeStart);
                const latitude = locationPage.slice(latitudeStart, latitudeEnd);
                console.log(latitude);

                const longitudeSearchString = '<meta property="place:location:longitude" content="';
                const longitudeStart = locationPage.indexOf(longitudeSearchString) + longitudeSearchString.length;
                const longitudeEnd = locationPage.indexOf('"', longitudeStart);
                const longitude = locationPage.slice(longitudeStart, longitudeEnd);
                console.log(longitude);

                chrome.runtime.sendMessage({
                  msg: 'location_found',
                  data: {
                    lat: latitude,
                    lng: longitude,
                  },
                });
              });
          }
          const closeBtn = document.querySelector('button.ckWGn');
          closeBtn.click();
          photo.visited = true;
          visitElement(photoArray, ++index);
        }, 1000);
      }
    };

    visitElement(photosToVisit, 0);
  }, 2000);
})();
