export interface LoginData {
    username: string;
    password: string;
}

export interface RouterItem {
    path: string;
    key: string;
    label: string;
    icon: React.ReactNode;
    parentkey: string;
    showMenu: boolean;
    element: React.ReactNode;
}