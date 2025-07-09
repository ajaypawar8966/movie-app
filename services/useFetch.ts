import { useEffect, useState } from "react"

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)
            const reuslt = await fetchFunction()
            setData(reuslt)

        } catch (err) {
            setError(err instanceof Error ? err : new Error("An error occured"))
        } finally {
            setLoading(false)
        }
    }
    const reset = () => {
        setLoading(false)
        setError(null)
        setData(null)
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { data, loading, error, refetch: fetchData, reset }

}

export default useFetch