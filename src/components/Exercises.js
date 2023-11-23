import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';

import { exercisesOptions, fetchData } from '../utils/fetchData';

import ExerciseCard from './ExerciseCard';

const Exercises = ({ setExercises, bodyPart, exercises }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const exercisePerPage = 9;

  const indexOfLastExercise = currentPage * exercisePerPage;
  const indexOfFirstExercise = indexOfLastExercise -exercisePerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = ( e, value ) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: 'smooth'});
  }

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises?limit=1000', exercisesOptions);
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exercisesOptions);
      }
      setExercises(exercisesData);
    }
    fetchExercisesData();
  }, [bodyPart])

  return (
    <Box id="exercises"
      sx={{ mt: { lg: '110px' }}}
      mt="50px"
      p="20px"
    >
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px'}}} mb="35px" textAlign="center">
        Showing Results
      </Typography>
      <Stack direction="row" sx={{ gap: { lg: '110px', xs: '50px' }}} flexWrap="wrap" justifyContent="center">
        {currentExercises.map(( exercise, index ) => (
          <ExerciseCard key={index} exercise={exercise}/>
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > exercisePerPage && (
          <Pagination 
            color="primary"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisePerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"

          />
        )}
      </Stack>
    </Box>
  )
}

export default Exercises