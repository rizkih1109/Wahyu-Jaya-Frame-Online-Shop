declare interface Store {
  id: number;
  storeName: string;
  ownerId: number;
  branchs: Branch[];
  owner?: User;
}

declare interface User {
  id: number;
  email: string;
  password: string;
  userName: string;
  phone: string;
  role: string;
  avatar?: string;
  provinceId?: string;
  cityId?: string;
  districtId?: string;
  villageId?: string;
  street?: string;
  branchId?: number;
  refreshToken: string;
  accessToken: string;
}

declare interface Branch {
  id: number;
  branchName: string;
  storeId: number;
  adminId?: number;
  admin?: User;
  store?: Store;
  provinceId?: string;
  cityId?: string;
  districtId?: string;
  villageId?: string;
  street?: string;
  province?: Province;
  city?: City;
  district?: District;
  village?: Village;
}

declare interface Province {
  id: string;
  provinceName: string;
}

declare interface City {
  id: string;
  cityName: string;
  provinceId: string;
}

declare interface District {
  id: string;
  districtName: string;
  cityId: string;
}

declare interface Village {
  id: string;
  villageName: string;
  districtId: string;
}

declare interface formData {
  email: string;
  password: string;
  repassword?: string;
  userName?: string;
  phone?: string;
}

declare interface FormCredentialProps {
  type: "login" | "account" | "profile";
}

declare interface SideBarProps {
  name: string;
  href: string;
}

declare interface SideBarSectionsProps {
  title: string;
  items: { name: string; href: string }[];
}

declare enum Role {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  SELLER = "SELLER",
}

declare type ModalProps = {
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
};

interface FormBranchProps {
  data: Branch;
  mode: string
}

declare type FilterProps = {
    keyword: string;
    sort: string;
    sortBy: string;
    page?: number;
    limit?: number;
    setKeyword?: (keyword: string) => void;
    setSort?: (sort: string) => void;
    setSortBy?: (sort: string) => void;
}