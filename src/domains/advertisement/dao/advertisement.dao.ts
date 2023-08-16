// import { AdvertisementModel } from '../dto/advertisement.dto';
// import { AdvertisementSchema } from '../schemas/advertisement.schema';
// import { InjectModel } from '@nestjs/mongoose';

// class AdvertisementDao {
//   constructor(
//     @InjectModel(AdvertisementSchema) private Advertisement: AdvertisementModel,
//   ) {}

//   async createAdvertisement(req: Request) {
//     const body = {
//       ...req.body,
//       region: req.headers?.region,
//     };
//     const newaAd = new Advertisement(body);
//     const data = await newaAd.save();
//     if (data) {
//       return data;
//     }
//   }
// }
