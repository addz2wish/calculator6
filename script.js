document.addEventListener("DOMContentLoaded", function() {
  const companyGradeSelect = document.getElementById('companyGrade');
  const categoryTypeSelect = document.getElementById('categoryType');
  const numSubcategoriesInput = document.getElementById('numSubcategories');
  const registrationDurationSelect = document.getElementById('registrationDuration');
  const reyadaCardCheckbox = document.getElementById('reyadaCardHolder');
  
  const reviewFeeElement = document.getElementById('reviewFee');
  const registrationFeeElement = document.getElementById('registrationFee');
  const subcategoryFeeElement = document.getElementById('subcategoryFee');
  const totalFeeElement = document.getElementById('totalFee');
  const consultancyNote = document.getElementById('consultancyNote');

  // Fee rules
  const feeRules = {
    review: {
      excellent: 10,
      first: 10,
      second: 10,
      third: 5,
      fourth: 5
    },
    registration: {
      excellent: 200,
      first: 150,
      second: 75,
      third: 50,
      fourth: 50
    },
    subcategory: {
      excellent: 5,
      first: 5,
      second: 0,
      third: 0,
      fourth: 0
    }
  };

  // Function to remove "Consultancy" option if Grade 4 is selected
  function adjustConsultancyOption() {
    const selectedGrade = companyGradeSelect.value;
    const consultancyOption = categoryTypeSelect.querySelector('option[value="consultancy"]');
    
    if (selectedGrade === 'fourth') {
      consultancyOption.disabled = true;
      consultancyOption.selected = false;
      consultancyNote.textContent = "Registration for consultancy in Grade 4 is not allowed, please select Grade 3.";
    } else {
      consultancyOption.disabled = false;
      consultancyNote.textContent = '';
    }
  }

  // Event listener for form changes
  function calculateFees() {
    const selectedGrade = companyGradeSelect.value;
    const selectedCategories = Array.from(categoryTypeSelect.selectedOptions).map(option => option.value);
    const numSubcategories = parseInt(numSubcategoriesInput.value) || 0;
    const registrationDuration = reyadaCardCheckbox.checked ? 2 : parseInt(registrationDurationSelect.value);
    const reyadaDiscount = reyadaCardCheckbox.checked;

    // Calculate review fee
    const reviewFee = feeRules.review[selectedGrade];

    // Calculate registration fee
    const registrationFee = feeRules.registration[selectedGrade] * selectedCategories.length * registrationDuration;

    // Calculate subcategory fee
    const subcategoryFee = feeRules.subcategory[selectedGrade] * numSubcategories;

    // Apply Reyada discount (2 years only)
    const registrationFeeAfterDiscount = reyadaDiscount ? Math.max(0, registrationFee - (feeRules.registration[selectedGrade] * selectedCategories.length * 2)) : registrationFee;

    // Calculate total fee
    const totalFee = reviewFee + registrationFeeAfterDiscount + subcategoryFee;

    // Update UI
    reviewFeeElement.textContent = `${reviewFee} OMR`;
    registrationFeeElement.textContent = `${registrationFeeAfterDiscount} OMR`;
    subcategoryFeeElement.textContent = `${subcategoryFee} OMR`;
    totalFeeElement.textContent = `${totalFee} OMR`;
  }

  // Event listeners
  companyGradeSelect.addEventListener('change', function() {
    adjustConsultancyOption();
    calculateFees();
  });
  categoryTypeSelect.addEventListener('change', calculateFees);
  numSubcategoriesInput.addEventListener('input', calculateFees);
  registrationDurationSelect.addEventListener('change', calculateFees);
  reyadaCardCheckbox.addEventListener('change', function() {
    if (reyadaCardCheckbox.checked) {
      registrationDurationSelect.value = 2;
      registrationDurationSelect.disabled = true;
    } else {
      registrationDurationSelect.disabled = false;
    }
    calculateFees();
  });

  // Switch Language Function
  function switchLanguage() {
    const lang = document.body.lang === 'en' ? 'ar' : 'en';
    document.body.lang = lang;

    if (lang === 'ar') {
      // Change text for Arabic
      document.getElementById('title').textContent = "حاسبة رسوم تسجيل الشركات";
      document.getElementById('companyGradeLabel').textContent = "درجة الشركة";
      document.getElementById('categoryTypeLabel').textContent = "نوع الفئة (الفئات)";
      document.getElementById('numSubcategoriesLabel').textContent = "عدد الفئات الفرعية";
      document.getElementById('registrationDurationLabel').textContent = "مدة التسجيل (بالسنوات)";
      document.getElementById('reviewFeeLabel').textContent = "رسوم المراجعة: ";
      document.getElementById('registrationFeeLabel').textContent = "رسوم التسجيل: ";
      document.getElementById('subcategoryFeeLabel').textContent = "رسوم الفئات الفرعية: ";
      document.getElementById('totalFeeLabel').textContent = "الرسوم الإجمالية: ";
      document.getElementById('switchLang').textContent = "التبديل إلى الإنجليزية";
    } else {
      // Change text back to English
      document.getElementById('title').textContent = "Companies Registration Fees Calculator";
      document.getElementById('companyGradeLabel').textContent = "Company Grade";
      document.getElementById('categoryTypeLabel').textContent = "Category Type(s)";
      document.getElementById('numSubcategoriesLabel').textContent = "Number of Subcategories";
      document.getElementById('registrationDurationLabel').textContent = "Registration Duration (Years)";
      document.getElementById('reviewFeeLabel').textContent = "Review Fee: ";
      document.getElementById('registrationFeeLabel').textContent = "Registration Fee: ";
      document.getElementById('subcategoryFeeLabel').textContent = "Subcategory Fee: ";
      document.getElementById('totalFeeLabel').textContent = "Total Fee: ";
      document.getElementById('switchLang').textContent = "Switch to Arabic";
    }
  }

  // Initial calculation and adjustment
  adjustConsultancyOption();
  calculateFees();

  // Add event listener for language switch button
  document.getElementById('switchLang').addEventListener('click', switchLanguage);
});
