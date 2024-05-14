import React from "react"
import CurrencyFormat from "react-currency-format"

interface CurrencyTextProps {
    value: number | string
}

export const CurrencyText: React.FC<CurrencyTextProps> = ({ value }) => {
    return (
        <CurrencyFormat
            value={value}
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"R$ "}
        />
    )
}
