export class UserModel {
  avatar: string;
  index: number;
  phoneNumber: string;
  createdAt: Date;
  email: string;
  fullName: string;
  isAdmin: boolean;
  status: boolean;
  updatedAt: Date;
  _id: string;
  constructor(user?: any) {
    this._id = user?._id || '';
    this.avatar = user?.avatar || '';
    this.index = user?.index || 0;
    this.email = user?.email || '';
    this.phoneNumber = user?.phoneNumber || '';
    this.fullName = user?.fullName || '';
    this.status = user?.status ? true : false;
    this.createdAt = new Date(user?.createdAt ?? '');
    this.updatedAt = new Date(user?.updatedAt ?? '');
    this.isAdmin = user?.isAdmin ? true : false;
  }
}
