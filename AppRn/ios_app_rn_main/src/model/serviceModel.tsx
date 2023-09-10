
export interface Response<T> {
    meta: Meta;
    details: T;
  }
  
  export interface Meta {
    code: number;
  }
    
    //品牌服务总数据
    export interface ServiceDetails {
      index: number;
      name: string;
      brand: string;
      icons: ServiceIcons;
    }
  
    export interface ServiceIcons {
      details: ServiceDetailIcons[];
    }
    
    //品牌下的服务项
    export interface ServiceDetailIcons {
      id: number;
      title: string;
      url: string;
      link: string;
    }
  
    //服务新闻资讯数据
    export interface ServiceBanners {
      id: number;
      title: string;
      url: string;
      link: string;
    }
    
  