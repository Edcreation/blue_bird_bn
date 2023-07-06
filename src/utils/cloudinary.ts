import { v2 as Cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

Cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImage = async (path: string , folder: any) => {
  try {
      const data = await Cloudinary.uploader.upload(path, {
          folder
      });
      return { url: data.url, public_id: data.public_id };
  } catch (error) {
      throw new Error('Error Uploading Image');
  }
}
export const deleteImage = async (public_id: string) => {
  await Cloudinary.uploader.destroy(public_id, (error, result) => {
      // console.log(result,error)
  })
}

export default Cloudinary;