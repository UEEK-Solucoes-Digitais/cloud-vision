export function ConvertToMoney(value: number) {
    const formatToBRL = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)

    return formatToBRL
}
