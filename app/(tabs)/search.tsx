import { searchMovies } from '@/components/helpers'
import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import useFetch from '@/services/useFetch'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'

const search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  // const router = useRouter();
  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset

  } = useFetch(() =>
    fetchMovies({
      query: searchQuery,
    })
    , false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery?.trim()) {
        await loadMovies()
      } else {
        reset()
      }
    }, 500)

    return () => clearTimeout(timeoutId)

  }, [searchQuery])

  const results = searchMovies(searchQuery);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover' />
      <FlatList
        data={results}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: "16",
          marginVertical: 16
        }}
        contentContainerStyle={{
          paddingBottom: 100
        }}
        ListEmptyComponent={
          // !loading && !error 
          results?.length === 0
            ?
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie '}
              </Text>
            </View> : null
        }
        ListHeaderComponent={<>
          <View className='w-full flex-row justify-center mt-20 items-center'>
            <Image source={icons.logo} className='w-12 h-10' />
          </View>
          <View className='mt-5'>
            <SearchBar
              placeholder='Search movies'
              value={searchQuery}
              onChangeText={
                (text: string) => setSearchQuery(text)
              }
            />
          </View>
          {/* {loading && (
            <ActivityIndicator size="large" color="#0000ff" className='my-3' />
          )}
          {
            error && (<Text className='text-red-500 px-5 my-3'>Error : {error.message}</Text>)
          } */}
          {
            // !loading && !error && searchQuery.trim() && 
            results?.length > 0 &&
            <Text className='text-xl text-white font-bold' >
              Search Results for {''}
              <Text className='text-accent'>{searchQuery}</Text>
            </Text>
          }

        </>}
      />
    </View>
  )
}

export default search

const styles = StyleSheet.create({})