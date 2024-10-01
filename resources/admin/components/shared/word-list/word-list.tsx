import React, { useEffect, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import styles from './styles.module.scss'

interface WordListProps {
    name: string
    setValue: UseFormSetValue<any>
    value?: string
    label?: string
}

const WordList: React.FC<WordListProps> = ({ name, setValue, value, label }) => {
    const [word, setWord] = useState('')
    const [words, setWords] = useState<string[]>(value ? value.split('|') : [])

    useEffect(() => {
        setValue(name, words.join('|'))
    }, [words, name, setValue])

    const handleAddWord = () => {
        if (word && !words.includes(word)) {
            const newWords = [...words, word]
            setWords(newWords)
            setWord('')
        }
    }

    const handleRemoveWord = (wordToRemove: string) => {
        const newWords = words.filter((w) => w !== wordToRemove)
        setWords(newWords)
    }

    return (
        <div className={styles.container}>
            {label && <label>{label}</label>}

            <div className={styles.inputGroup}>
                <input
                    type='text'
                    placeholder='Digite aqui'
                    maxLength={50}
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                />
                <button type='button' title='Adicionar item' onClick={handleAddWord}>
                    +
                </button>
            </div>

            <ul className={styles.wordList}>
                {words.map((word, index) => (
                    <li key={`word-${index + 1}`} className={styles.wordItem}>
                        <button
                            type='button'
                            title='Remover item'
                            className={styles.removeButton}
                            onClick={() => handleRemoveWord(word)}>
                            -
                        </button>

                        {word}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WordList
