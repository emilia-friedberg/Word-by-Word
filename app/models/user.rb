class User < ApplicationRecord
  validates :last_name, presence: true, length: { maximum: 50}
  validates :email, presence: true, length: { maximum: 50 }

 validates :email, presence: true, length: { maximum: 255 },
                     uniqueness: { case_sensitive: false }



  self.inheritance_column = "status"
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
