export interface SenderAddressProps {
  street: string;
  city: string;
  postCode: string;
  country: string;
}
export interface ClientInterfaceProps {
  street: string;
  city: string;
  postCode: string;
  country: string;
}
export interface ItemsProps {
  name: string;
  quantity: number;
  price: number;
  total: number;
}
export interface InvoiceProps {
  _id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: SenderAddressProps;
  clientAddress: ClientInterfaceProps;
  items: ItemsProps[];
  total: number;
}
export interface InvoiceDataProps {
  invoice: InvoiceProps;
}
