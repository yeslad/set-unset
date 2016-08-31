def dynamic_unset(path, original)
  if !original.is_a?(Hash)
    return false
  end
  while path.count > 1
    part = path.shift
    if original.is_a?(Hash) && original.key?(part)
      original = original[part]
    else
      return false
    end
  end
  
  if !original.is_a?(Hash) || !original.key?(path[0])
    return false
  end
  
  ret = original[path[0]]
  original.delete(path[0])
  
  ret
end

def dynamic_set(path, original, val)
  if !original.is_a?(Hash)
    return false
  end
  while path.count > 1
    part = path.shift
    if !original.key?(part)
      original[part] = {}
    elsif original[part].is_a?(Array)
      original[part] = ary_to_hash(original[part])
    end
    original = original[part]
  end
  
  if !original
    return false
  end
  
  original[path[0]] = val

  true
end

def ary_to_hash(arr)
	Hash[arr.each_with_index.map {|value, key| [key, value]}]
end