import React, { useState, useEffect} from 'react'
import { Box, Button, Stack, TextField, Typography} from "@mui/material"
import { fetchData, exerciseOptions} from '../utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
    const [search, setSearch] = useState('');
    const [bodyParts, setBodyParts] = useState([]);
    useEffect(() =>{
        const fetchExercisesData = async () => {
            const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
            setBodyParts(['all', ...bodyPartsData]);
        }
        fetchExercisesData();
    },[]);


    const handleSearch = async () => {
        if(search){
            const exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
            const searchedExercises = exerciseData.filter(
                (exercise) => exercise.name.toLowerCase().includes(search) 
                || exercise.target.toLowerCase().includes(search)
                || exercise.equipment.toLowerCase().includes(search)
                || exercise.bodyPart.toLowerCase().includes(search)
            );
            setSearch('');
            setExercises(searchedExercises);
        }
    };

  return (
    <Stack id="SearchExercises" alignItems="center" mt="37px" justifyContent="center"
    p="20px">
        <Typography fontWeight="780px" sx={{
            fontSize:{lg:"44px", xs: "30px"}
        }} mb="50px" textAlign="center">
            Awesome Exercises You <br/>
            Should Know
        </Typography>
        <Box position="relative" mb="72px">
            <TextField
                sx={{
                    input: {fontWeight: "700",
                    border:"none", borderRadius:"4px"
                    },
                    width:{lg:"800px", xs: "350px"},
                    backgroundColor:"#fff"
                }}
                height="76px"
                value={search}
                onChange={(e)=>{setSearch(e.target.value.toLowerCase())}}
                placeholder="Search Exercises"
                type="text"
             />
             <Button className="search-btn"
                sx={{bgcolor:"#ff2625",color:"#fff",
                texttransform:"none",
                width:{lg:"175px", xs:"80px"},
                fontSize:{lg:"20px", xs:"14px"},
                height:"56px",
                position:"absolute",
                right:"0"
                }}
                onClick={handleSearch}
             >
                Search
             </Button>
        </Box>
        <Box sx={{position:"relative", width: "100%", padding:"20px"}}>
                <HorizontalScrollbar data = {bodyParts} bodyPart={bodyPart} bodyParts setBodyPart = {setBodyPart}/>
        </Box>
    </Stack>
  );
};

export default SearchExercises;