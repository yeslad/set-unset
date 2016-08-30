def dynamic_unset(path, original)
  pass = false
  while path.count > 1
    part = path.shift
    if !pass && original.key?(part)
      pass = original[part]
    elsif pass && pass.key?(part)
      pass = pass[part]
    else
      return false
    end
  end
  
  if !pass || !pass.key?(path[0])
    return false
  end
  
  ret = pass[path[0]]
  pass.delete(path[0])
  
  ret
end

def dynamic_set(path, original, val)
  pass = false
  while path.count > 1
    part = path.shift
    if !pass
      if !original.key?(part)
        original[part] = {}
      end
      pass = original[part]
    else
      if !pass.key?(part)
        pass[part] = {}
      end
      pass = pass[part]
    end
  end
  
  if !pass
    return false
  end
  
  pass[path[0]] = val

  true
end