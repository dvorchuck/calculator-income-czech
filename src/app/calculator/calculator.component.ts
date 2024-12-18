import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'

enum Currency {
  CZK = 'CZK',
  EUR = 'EUR',
  USD = 'USD',
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  currencySuffix: string = 'Kč'
  currency: Currency = Currency.CZK
}
