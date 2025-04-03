export interface Pagenation {
    pageSize: number;
    pageNo: number; 
}

export interface Search {
    search: string;
}


export interface CommonTime {
    created_at?: string;
    updated_at?: string;
}

export interface CommonRemark  {
    remark?: string
 }
export interface CommonId {
    id: number;
}

export interface CommonUuid {
    uuid: string;
}
