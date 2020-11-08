// @flow strict

import type {Node} from 'react';

import React, {useCallback, useMemo, useState} from 'react';
import debounce from 'utils/debounce';
import {TextField, Chip} from '@material-ui/core';
import {Autocomplete} from '@material-ui/lab';

import {useQuery} from '@apollo/client';
import {TAG_AUTOCOMPLETE} from 'services/apollo/queries';

type Props = {
  tags: string[],
  setTags: (tags: string[]) => void,
};

function TagAutoComplete({tags, setTags}: Props): Node {
  const [inputTag, setInputTag] = useState('');
  const [options, setOptions] = useState([]);
  const {error, loading, refetch} = useQuery(TAG_AUTOCOMPLETE, {
    variables: {
      input: '',
    },
  });

  const handleSearch = useCallback(
    (q: string) => {
      if (inputTag === '') {
        setOptions(tags ? [tags] : []);
        return undefined;
      }
      refetch({input: q}).then((result) => {
        console.log('REFETCH', result.data);
        setOptions(result.data.autoCompleteTag);
      });
    },
    [refetch, inputTag, tags],
  );
  const debounced = useMemo(() => debounce(handleSearch, 400), [handleSearch]);

  const onChange = (value) => {
    setInputTag(value);
    debounced(value);
  };

  //console.log(options);
  if (loading) console.log('loading');
  if (error) console.log('erro');

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      freeSolo
      includeInputInList
      filterSelectedOptions
      multiple
      style={{width: '100%'}}
      value={tags}
      noOptionsText="No se encontraron con ese nombre"
      getOptionLabel={(option) => (typeof option === 'object' ? 'Cargando' : option)}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setTags(newValue);
      }}
      inputValue={inputTag}
      onInputChange={(event, newInputValue) => {
        onChange(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Categorías" variant="outlined" fullWidth />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            color="primary"
            style={{color: 'white'}}
            label={typeof option === 'object' ? 'Cargando' : option}
            {...getTagProps({index})}
          />
        ))
      }
    />
  );
}

export default TagAutoComplete;
