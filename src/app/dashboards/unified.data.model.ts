export interface Udm {
    name_hash: {
        country: string
        name: string
        ranks:{
            [rid: string]: string
        }
        rcount: number
    }
  }