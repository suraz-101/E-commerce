// import { add } from "date-fns";
import easyinvoice from "easyinvoice";
import { dateFormatter } from "../dateFormatter";

export const invoiceGenerator = async (usersName, date, items, add) => {
  const invoiceDate = dateFormatter(date);
  // Transform items array to match easyinvoice's expected format
  const products = items.map((item) => ({
    quantity: item?.quantity,
    description: item?.productName, // Using "name" instead of "description"
    taxRate: item?.taxRate,
    price: item?.price,
  }));

  var data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
    images: {
      // The logo on top of your invoice
      logo: "https://png.pngtree.com/png-clipart/20230425/original/pngtree-3d-location-icon-clipart-in-transparent-background-png-image_9095284.png",
      // The invoice background
    }, //or base64
    settings: {
      currency: "USD",
      locale: "en-US", // Adjust as needed
      // Other settings...
    },
    sender: {
      company: "PKR STORE",
      address: "steet 17, Lakeside-06",
      zip: "33700",
      city: "Pokhara",
      country: "Nepal",
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    client: {
      company: usersName,
      address: add,

      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    information: {
      // Invoice number
      number: "2021.0001",
      // Invoice data
      date: invoiceDate,
      // Invoice due date
    },

    products: products,
    bottomNotice: "Thank You For Choosing us",
    //Used for translating the headers to your preferred language
    //Defaults to English. Below example is translated to Dutch
    // "translate": {
    //     "invoiceNumber": "Factuurnummer",
    //     "invoiceDate": "Factuurdatum",
    //     "products": "Producten",
    //     "quantity": "Aantal",
    //     "price": "Prijs",
    //     "subtotal": "Subtotaal",
    //     "total": "Totaal"
    // }
  };

  //Create your invoice! Easy!
  const result = await easyinvoice.createInvoice(data);
  easyinvoice.download("myInvoice.pdf", result.pdf);
};
