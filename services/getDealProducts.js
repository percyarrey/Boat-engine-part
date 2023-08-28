import Products from "@/models/Products";
import connectDB from "../utils/connectDB";

export const getDealProduct = async (page, searchParams) => {
    var data;
    var hasNextPage;
    const size = 5;
    page = page * size;
    if (page < 0) {
      page = 0;
    }
    await connectDB();
    if (Object.keys(searchParams).length===0) {
      data = await Products.find({}).limit(size).skip(page);
      hasNextPage =
        (await Products.find({}).limit(1).skip(page + size).countDocuments()) >
        0;
    } else {
      const productRegex = new RegExp(searchParams.query, 'i');
      const descriptionRegex = new RegExp(searchParams.query, 'i');
      const brand = new RegExp(searchParams.brand, 'i');
      const hp = Math.floor(searchParams.hp / 0.746) || 10000000000;
      const price = searchParams.Price || 10000000000;

      const rating = searchParams.Rating ? { rating: searchParams.Rating } : {};

      const Sortby = searchParams.Sortby
      data = await Products.find({
        $and: [
          {
            $or: [
              { productname: productRegex },
              { description: descriptionRegex },
            ]
          },
          {
            brand: brand
          },
          {
            hp: { $lt: hp }
          },
          rating,
          {
            price: { $lt: price }
          }
        ]
      }).limit(size).sort({ [Sortby]: -1 }).skip(page);
      hasNextPage =
      (await Products.find({
        $and: [
          {
            $or: [
              { productname: productRegex },
              { description: descriptionRegex },
            ]
          },
          {
            brand: brand
          },
          {
            hp: { $lt: hp }
          },
          rating
        ]
      }).limit(1).sort({ [Sortby]: -1 }).skip(page + size).countDocuments()) > 0;
      
    }

    /* const res = await fetch(`${process.env.BACKEND_URI}crudproduct`, {
      method: "GET",
      cache: "force-cache",
    });
    const { data } = await res.json(); */
    return { data: JSON.parse(JSON.stringify(data)), npage: hasNextPage };

};

export default getDealProduct;