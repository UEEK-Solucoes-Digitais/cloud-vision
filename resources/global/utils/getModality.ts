export function getModality(modality: number) {
    switch (modality) {
        case 1:
            return 'CLT'
        case 2:
            return 'Contrato Temporário'
        case 3:
            return 'Home-office'
        case 4:
            return 'Meio-período'
        case 5:
            return 'Remoto'
        case 6:
            return 'Evento'
        default:
            return ''
    }
}

export function getCNH(cnh: number) {
    switch (cnh) {
        case 1:
            return 'A'
        case 2:
            return 'B'
        case 3:
            return 'C'
        case 4:
            return 'D'
        case 5:
            return 'E'
        case 6:
            return 'AB'
    }
}

export function getEducationLevel(educationLevel: number) {
    switch (educationLevel) {
        case 1:
            return 'Fundamental Completo'
        case 2:
            return 'Ensino Médio Incompleto'
        case 3:
            return 'Ensino Médio Completo'
        case 4:
            return 'Superior (graduação)'
        case 5:
            return 'Pós-graduação'
        case 6:
            return 'Mestrado'
        case 7:
            return 'Doutorado'
        default:
            return ''
    }
}

export function getMaritalStatus(maritalStatus: number) {
    switch (maritalStatus) {
        case 1:
            return 'Solteiro(a)'
        case 2:
            return 'Casado(a)'
        case 3:
            return 'Separado(a)'
        case 4:
            return 'Divorciado(a)'
        case 5:
            return 'Viúvo(a)'
        default:
            return ''
    }
}
export function getSex(sex: number) {
    switch (sex) {
        case 1:
            return 'Feminino'
        case 2:
            return 'Masculino'
        case 3:
            return 'Outro'
        default:
            return ''
    }
}

// data em dd/mm/yyyy
export function getDifference(date: string) {
    console.log(date)
    const today = new Date()
    const birthDate = new Date(date.split('/').reverse().join('-'))
    const age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1
    }
    return age
}
