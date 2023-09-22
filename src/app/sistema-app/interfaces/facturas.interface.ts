
export interface FacturasInterface {
    id?: number;
    fecha: string;
    nombreCliente: string;
    direccionCliente: string;
    telefonoCliente: string;
    nombreVendedor: string;
    emailVendedor: string;
    telefonoVendedor: string;
    productos: Producto[];
}

interface Producto {
    id?: string;
    codigo: string;
    nombre: string;
    precio: number;
    cantidad: number;
}
