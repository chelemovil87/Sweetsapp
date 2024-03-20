import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public ticket: {
    nombre: string;
    cantidad: number;
    precio: number;
    total: number;
  }[] = [];
  fechaHoy: string = new Date().toLocaleDateString();
  public i: number = 0;

  constructor() {
    this.ticket = JSON.parse(localStorage.getItem('ticket') || '[]');
  }

  public agregarAlTicket(nombre: string, cantidad: number, precio: number) {
    const productoExistente = this.ticket.find(
      (producto) => producto.nombre === nombre
    );
    if (productoExistente) {
      productoExistente.cantidad += cantidad;
      productoExistente.total = productoExistente.cantidad * precio;
      this.saveLocalStorage();
    } else {
      const total = cantidad * precio;
      this.ticket.push({ nombre, cantidad, precio, total });
    }
  }
  public cantidad: number = 0;

  public getTotalGeneral() {
    return this.ticket.reduce((acc, producto) => acc + producto.total, 0);
  }

  restarProducto(index: number) {
    if (this.ticket[index].cantidad > 0) {
      this.ticket[index].cantidad--;
      // Actualiza el total del producto
      this.ticket[index].total =
        this.ticket[index].cantidad * this.ticket[index].precio;
      // Actualiza el total general
      this.getTotalGeneral();
      // Guarda los cambios en el localStorage
      this.saveLocalStorage();
    }
  }

  updateTotalGeneral() {
    let totalGeneral = 0;
    this.ticket.forEach((producto) => {
      totalGeneral += producto.total;
    });
  }

  private saveLocalStorage() {
    localStorage.setItem('ticket', JSON.stringify(this.ticket));
  }

  private loadLocalStorage() {
    this.ticket = JSON.parse(localStorage.getItem('ticket') || '[]');
  }
  clearLocalStorage() {
    localStorage.removeItem('ticket');
  }
  resetTicket() {
    this.ticket = [];
    this.clearLocalStorage();
  }
}
