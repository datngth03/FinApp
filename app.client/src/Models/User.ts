export type UserProfileToken = {
    userName: string;
    email: string;
    token: string;
    refreshToken: string;
    expiration: string;
};

export type UserProfile = {
    userName: string;
    email: string;
};
