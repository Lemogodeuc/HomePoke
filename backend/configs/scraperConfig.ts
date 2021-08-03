export default [
  {
    active: true,
    pollInterval: 5000,
    fetchOnlyOnce: true,
    url: "https://www.leboncoin.fr/recherche?category=10&text=appartement&locations=Bayonne_64100__43.49273_-1.4787_5005%2CAnglet_64600__43.48188_-1.5147_5380%2CBidart_64210__43.4391_-1.591_3996%2CBiarritz_64200__43.48285_-1.55883_4205&real_estate_type=2&price=500-750&rooms=2-2&square=40-max",
    request: {
      method: "options",
      url: "https://www.leboncoin.fr/recherche?category=10&text=appartement&locations=Bayonne_64100__43.49273_-1.4787_5005%2CAnglet_64600__43.48188_-1.5147_5380%2CBidart_64210__43.4391_-1.591_3996%2CBiarritz_64200__43.48285_-1.55883_4205&real_estate_type=2&price=500-750&rooms=2-2&square=40-max",
      headers: {},
    },
  },
  {
    active: false,
    pollInterval: 5000,
    fetchOnlyOnce: true,
    url: "https://www.seloger.com/list.htm?projects=1&types=1,2&places=[{%22inseeCodes%22:[640122]},{%22inseeCodes%22:[640024]},{%22inseeCodes%22:[640102]},{%22inseeCodes%22:[640125]},{%22inseeCodes%22:[640483]}]&price=NaN/750&surface=35/NaN&rooms=2&sort=d_dt_crea&enterprise=0&qsVersion=1.0&m=search_hp_last",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
      referrer: "https://google.com",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "fr-FR,fr;en-US,en;q=0.9",
      Pragma: "no-cache",
    },
  },
  {
    active: false,
    pollInterval: 5000,
    fetchOnlyOnce: true,
    url: "https://www.orpi.com/recherche/rent?transaction=rent&resultUrl=&realEstateTypes%5B0%5D=maison&realEstateTypes%5B1%5D=appartement&locations%5B0%5D%5Bvalue%5D=bayonne-biarritz-et-anglet&locations%5B0%5D%5Blabel%5D=Bayonne%2C%20Biarritz%20et%20Anglet&agency=&minSurface=&maxSurface=&nbRooms%5B0%5D=2&newBuild=&oldBuild=&minPrice=&maxPrice=700&sort=date-down&layoutType=mixte&nbBedrooms=&page=&minLotSurface=&maxLotSurface=&minStoryLocation=&maxStoryLocation=",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
      referrer: "https://google.com",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "fr-FR,fr;en-US,en;q=0.9",
      Pragma: "no-cache",
    },
  },
];
