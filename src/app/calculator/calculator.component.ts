import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'

interface Result {
  period: Period
  amount: number
  currency: string
}

enum Currency {
  CZK = 'CZK',
  EUR = 'EUR',
  USD = 'USD',
}

enum Period {
  Hour = 'Hodina',
  Day = 'Den',
  Month = 'Měsíc',
  Year = 'Rok',
}

const currencyConversion: Record<Currency, string> = {
  CZK: 'Kč',
  EUR: '€',
  USD: '$',
}

const conversionToMonth: Record<Period, number> = {
  [Period.Hour]: 20 * 8,
  [Period.Day]: 20,
  [Period.Month]: 1,
  [Period.Year]: 1 / 12,
}

function getConvertConstant(from: Period, to: Period): number {
  return conversionToMonth[from] / conversionToMonth[to]
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  currencyOptions: Currency[] = [Currency.CZK, Currency.EUR, Currency.USD]

  currencySuffix = computed<string>(
    () => currencyConversion[this.selectedCurrency()]
  )

  selectedCurrency = signal<Currency>(Currency.CZK)
  selectedPeriod = signal<Period>(Period.Day)
  periodOptions: Period[] = [Period.Hour, Period.Day, Period.Month, Period.Year]

  income = signal(10_000)
  hppNetIncome = signal(0)

  results = computed<Result[]>(() => [
    {
      period: Period.Year,
      amount: Math.round(
        this.income() * getConvertConstant(this.selectedPeriod(), Period.Year)
      ),
      currency: this.currencySuffix(),
    },
    {
      period: Period.Month,
      amount: Math.round(
        this.income() * getConvertConstant(this.selectedPeriod(), Period.Month)
      ),
      currency: this.currencySuffix(),
    },
    {
      period: Period.Day,
      amount: Math.round(
        this.income() * getConvertConstant(this.selectedPeriod(), Period.Day)
      ),
      currency: this.currencySuffix(),
    },
    {
      period: Period.Hour,
      amount: Math.round(
        this.income() * getConvertConstant(this.selectedPeriod(), Period.Hour)
      ),
      currency: this.currencySuffix(),
    },
  ])

  onIncomeChange(event: Event) {
    this.income.set(Number((event.target as HTMLInputElement).value))
  }

  onHppNetoChange(event: Event) {
    this.hppNetIncome.set(Number((event.target as HTMLInputElement).value))
  }
}
