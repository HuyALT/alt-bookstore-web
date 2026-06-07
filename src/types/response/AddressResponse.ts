export interface AddressResponse {
    id: string;
    fullName: string;
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
    country: string;
    phoneNumber: string;
    isDefault: boolean;
    createdAt: string;
}