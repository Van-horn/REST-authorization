module.exports = class StoreItemDto {
  productId:number;
  name:string;
  category:string;
  quantity:number;
  productPreviewImg:string;
  productImages:string[];
  productDescription;
  comments;
  averageRating:number;
  likes:number;

  constructor(model:any) {
    this.productId = model.productId;
    this.name = model.name;
    this.category = model.category;
    this.quantity = model.quantity;
    this.productPreviewImg = model.productPreviewImg;
    this.productImages = model.productImages;
    this.productDescription = model.productDescription;
    this.comments = model.comments;
    this.averageRating = model.averageRating;
    this.likes = model.likes;
  }
};
