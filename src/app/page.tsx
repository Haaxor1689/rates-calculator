'use client';

import { Fragment, useState } from 'react';

const Currencies = {
	USD: 1,
	GBP: 1.25,
	EUR: 1.06,
	CZK: 0.042
} as const;
type Currency = keyof typeof Currencies;

const toUSD = (currency: Currency, value: number | null) =>
	value === null ? null : value * Currencies[currency];
const fromUSD = (currency: Currency, value: number | null) =>
	value === null ? null : value / Currencies[currency];

const Rates = {
	Yearly: 1920,
	Monthly: 160,
	Daily: 8,
	Hourly: 1
};
type Rate = keyof typeof Rates;

const toHourly = (rate: Rate, value: number | null) =>
	value === null ? null : value / Rates[rate];
const fromHourly = (rate: Rate, value: number | null) =>
	value === null ? null : value * Rates[rate];

const getNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
	const num = parseFloat(e.target.value);
	if (isNaN(num)) return null;
	return num;
};

type Props = {
	value: number | null;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ value, onChange }: Props) => (
	<input
		type="number"
		value={value === null ? '' : value.toFixed(0)}
		onChange={onChange}
		className="w-full rounded border border-white bg-transparent p-2 text-white"
	/>
);

const HomePage = () => {
	const [hourlyRate, setHourlyRate] = useState<number | null>(null);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
					Rates calculator
				</h1>

				<div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] gap-2">
					<div />
					{Object.keys(Rates).map(rate => (
						<div key={rate} className="p-2">
							{rate}
						</div>
					))}
					{(Object.keys(Currencies) as Currency[]).map(currency => (
						<Fragment key={currency}>
							<div className="flex items-center justify-end p-2">
								{currency}
							</div>

							{(Object.keys(Rates) as Rate[]).map(rate => (
								<Input
									key={rate}
									value={fromUSD(currency, fromHourly(rate, hourlyRate))}
									onChange={e =>
										setHourlyRate(toUSD(currency, toHourly(rate, getNumber(e))))
									}
								/>
							))}
						</Fragment>
					))}
				</div>
			</div>
		</main>
	);
};
export default HomePage;
