// @flow strict

import type {Node} from 'react';

import React, {useCallback, useMemo, useState} from 'react';
import debounce from 'utils/debounce';
import {TextField, Chip} from '@material-ui/core';
import {Autocomplete, createFilterOptions} from '@material-ui/lab';

import {useQuery} from '@apollo/client';
import {TAG_AUTOCOMPLETE} from 'services/apollo/queries';

type Props = {
  tags: string[],
  setTags: (tags: string[]) => void,
  className?: ?string,
};

const filter = createFilterOptions();

function TagAutoComplete({tags, setTags, className}: Props): Node {
  const [inputTag, setInputTag] = useState('');
  const [options, setOptions] = useState([]);
  const {error, loading, refetch} = useQuery(TAG_AUTOCOMPLETE, {
    variables: {
      input: '',
    },
  });

  const handleSearch = useCallback(
    (q: string) => {
      if (q === '') {
        setOptions([]);
        return undefined;
      }
      refetch({input: q}).then((result) => {
        console.log('REFETCH', result.data);
        setOptions(result.data.autoCompleteTag);
      });
    },
    [refetch],
  );
  const debounced = useMemo(() => debounce(handleSearch, 300), [handleSearch]);

  const onChange = (value) => {
    setInputTag(value);
    debounced(value);
  };

  if (loading) console.log('loading');
  if (error) console.log('erro');

  return (
    <Autocomplete
      id="combo-box-demo"
      freeSolo
      includeInputInList
      filterSelectedOptions
      selectOnFocus
      clearOnBlur
      multiple
      className={className}
      style={{width: '100%'}}
      value={tags}
      options={options}
      noOptionsText="No se encontraron con ese nombre"
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : 'Busca algo...'
      }
      getOptionDisabled={(option) => {
        if (typeof option !== 'string') return true;
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
          filtered.push(params.inputValue);
        }
        return filtered;
      }}
      onChange={(event, newValue) => {
        if (newValue.length === 0) {
          setOptions([]);
        } else {
          setOptions(newValue ? [...newValue] : options);
        }
        setTags(newValue);
      }}
      inputValue={inputTag}
      onInputChange={(event, newInputValue) => onChange(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Categorías"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
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
