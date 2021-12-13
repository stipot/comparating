export interface RankDataRecord {
    rank: string,
    country: string,
    orgName: string,
    rating: string,
    year: number
}
export interface DisambData {
    [origName: string]: {
        origName: string
        uName: string
        site: string
        destUrl: string
    }
}
export interface Udm {
    [name_hash: string]: {
        country: string
        orgName: string
        ranks: {
            [rid: string]: string
        }
        rcount: number
        syns?: string[]
    }
}