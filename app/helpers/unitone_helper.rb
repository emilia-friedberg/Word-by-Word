module UnitoneHelper
  def to_bool(string)
    return true if string.downcase.strip == 'true'
    return false if string.downcase.strip == 'false'
    return string
  end
end
