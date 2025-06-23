document.addEventListener("DOMContentLoaded", function () {
  // EmailJS 초기화 (실제 사용을 위해서는 EmailJS 계정이 필요합니다)
  // emailjs.init("YOUR_PUBLIC_KEY");
  
  // AOS initialization
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 50,
    delay: 0,
    anchorPlacement: 'top-bottom'
  });

  // Static FAQ section toggle logic
  const staticFaqData = [
    {
      question: "서비스 신청 후 얼마나 빨리 시작할 수 있나요?",
      answer:
        "서비스 신청 후 최대 24시간 이내에 담당자가 연락드리며, 협의 후 최소 1-2일 내에 서비스를 시작할 수 있습니다. 급하신 경우 별도로 문의주시면 최대한 빠르게 진행해 드립니다.",
    },
    {
      question: "물량이 일정하지 않은 경우에도 이용할 수 있나요?",
      answer:
        "네, 물량이 일정하지 않아도 이용 가능합니다. 실제 발송량에 따라 요금이 책정되며, 최소 주문 수량 제한은 없습니다. 다만, 대량 발송 시 미리 알려주시면 더욱 원활한 서비스 제공이 가능합니다.",
    },
    {
      question: "특별한 포장이 필요한 제품도 처리 가능한가요?",
      answer:
        "네, 가능합니다. 깨지기 쉬운 제품, 특수 포장이 필요한 제품 등 다양한 제품에 대한 맞춤형 포장 서비스를 제공합니다. 특별한 요구사항이 있으시면 견적 문의 시 함께 알려주세요.",
    },
    {
      question: "서비스 이용 중 문제가 발생하면 어떻게 해결하나요?",
      answer:
        "전담 CS팀이 신속하게 대응해 드립니다. 문제 발생 시 즉시 담당자에게 연락주시면 최우선으로 해결해 드립니다. 대량 발송 고객의 경우 전담 매니저가 배정되어 더욱 빠른 대응이 가능합니다.",
    },
    {
      question: "계약 기간이나 최소 이용 기간이 있나요?",
      answer:
        "별도의 최소 이용 기간이나 의무 계약 기간은 없습니다. 필요하실 때 언제든지 서비스를 이용하실 수 있으며, 장기 계약 시 추가 할인 혜택을 제공해 드립니다.",
    },
  ];

  const staticFaqContainer = document.querySelector("#static-faq-container");

  if (staticFaqContainer) {
    staticFaqContainer.innerHTML = staticFaqData
      .map(
        (item) => `
      <div class="mb-4">
        <button
          class="faq-toggle w-full bg-white p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition-all"
        >
          <span class="font-medium text-left">${item.question}</span>
          <div
            class="w-6 h-6 flex items-center justify-center text-gray-600 faq-icon"
          >
            <i class="ri-arrow-down-s-line"></i>
          </div>
        </button>
        <div class="faq-content hidden bg-white px-4 pb-4 rounded-b-lg">
          <p class="text-gray-600">${item.answer}</p>
        </div>
      </div>
    `,
      )
      .join("");
  }

  const faqToggles = document.querySelectorAll(".faq-toggle");
  faqToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector(".faq-icon i");
      const isOpen = content.classList.contains("show");

      // Close all other open FAQs with smooth animation
      document.querySelectorAll(".faq-content.show").forEach((openContent) => {
        if (openContent !== content) {
          openContent.classList.remove("show");
          openContent.classList.add("hidden");
          const openIcon =
            openContent.previousElementSibling.querySelector(".faq-icon i");
          openIcon.classList.remove("ri-arrow-up-s-line");
          openIcon.classList.add("ri-arrow-down-s-line");
        }
      });

      if (!isOpen) {
        // Open current FAQ with smooth animation
        content.classList.remove("hidden");
        setTimeout(() => {
          content.classList.add("show");
        }, 10);
        icon.classList.remove("ri-arrow-down-s-line");
        icon.classList.add("ri-arrow-up-s-line");
      } else {
        // Close current FAQ with smooth animation
        content.classList.remove("show");
        setTimeout(() => {
          content.classList.add("hidden");
        }, 300);
        icon.classList.remove("ri-arrow-up-s-line");
        icon.classList.add("ri-arrow-down-s-line");
      }
    });
  });

  // FAQ Modal logic
  const faqModalData = [
    ...staticFaqData,
    {
      question: "견적은 어떻게 받을 수 있나요?",
      answer:
        "홈페이지 상단의 '견적 문의하기' 버튼을 클릭하시거나, 고객센터로 연락주시면 상세한 상담을 통해 맞춤 견적을 제공해 드립니다.",
    },
    {
      question: "주말에도 서비스 이용이 가능한가요?",
      answer:
        "기본적으로 평일 운영을 원칙으로 하고 있으나, 사전 협의를 통해 주말 서비스도 제공 가능합니다. 추가 비용이 발생할 수 있으니 상담을 통해 확인해 주세요.",
    },
  ];

  const modal = document.getElementById("faq-modal");
  const modalTrigger = document.getElementById("faq-modal-trigger");
  const modalClose = document.getElementById("faq-modal-close");
  const searchInput = document.getElementById("faq-search");
  const faqList = document.getElementById("faq-list");

  function renderFAQItems(items) {
    if (!faqList) return;
    faqList.innerHTML = items
      .map(
        (item) => `
        <div class="bg-gray-50 rounded-lg overflow-hidden">
          <button class="faq-modal-toggle w-full p-4 text-left font-medium flex justify-between items-center">
            <span>${item.question}</span>
            <div class="w-6 h-6 flex items-center justify-center text-gray-600">
              <i class="ri-arrow-down-s-line"></i>
            </div>
          </button>
          <div class="faq-modal-content hidden p-4 bg-white">
            <p class="text-gray-600">${item.answer}</p>
          </div>
        </div>
      `,
      )
      .join("");

    document.querySelectorAll(".faq-modal-toggle").forEach((toggle) => {
      toggle.addEventListener("click", function () {
        const content = this.nextElementSibling;
        const icon = this.querySelector("i");
        if (content.classList.contains("hidden")) {
          content.classList.remove("hidden");
          icon.classList.remove("ri-arrow-down-s-line");
          icon.classList.add("ri-arrow-up-s-line");
        } else {
          content.classList.add("hidden");
          icon.classList.remove("ri-arrow-up-s-line");
          icon.classList.add("ri-arrow-down-s-line");
        }
      });
    });
  }

  if (modalTrigger) {
    modalTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      renderFAQItems(faqModalData);
    });
  }

  if (modalClose) {
    modalClose.addEventListener("click", function () {
      modal.classList.add("hidden");
      document.body.style.overflow = "";
    });
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.add("hidden");
        document.body.style.overflow = "";
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const filteredFAQs = faqModalData.filter(
        (item) =>
          item.question.toLowerCase().includes(searchTerm) ||
          item.answer.toLowerCase().includes(searchTerm),
      );
      renderFAQItems(filteredFAQs);
    });
  }

  // Share Modal Logic
  const shareButton = document.getElementById("share-button");
  const shareModal = document.getElementById("share-modal");
  const shareModalClose = document.getElementById("share-modal-close");
  const copyLinkButton = document.getElementById("copy-link");
  const shareLink = document.getElementById("share-link");

  if (shareButton) {
    shareButton.addEventListener("click", function () {
      shareModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  }

  if (shareModalClose) {
    shareModalClose.addEventListener("click", function () {
      shareModal.classList.add("hidden");
      document.body.style.overflow = "";
    });
  }

  if (shareModal) {
    shareModal.addEventListener("click", function (e) {
      if (e.target === shareModal) {
        shareModal.classList.add("hidden");
        document.body.style.overflow = "";
      }
    });
  }

  if (copyLinkButton) {
    copyLinkButton.addEventListener("click", function () {
      if (!navigator.clipboard) {
        // Fallback for older browsers
        shareLink.select();
        document.execCommand("copy");
      } else {
        navigator.clipboard
          .writeText(shareLink.value)
          .then(() => {})
          .catch((err) => {
            console.error("Could not copy text: ", err);
          });
      }

      this.textContent = "복사됨";
      setTimeout(() => {
        this.textContent = "복사";
      }, 2000);
    });
  }

  // Form Controls Logic
  const quoteForm = document.getElementById("quote-form");
  if (quoteForm) {
    // Custom radio buttons
    const radioInputs = quoteForm.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((input) => {
      input.addEventListener("change", function () {
        // Hide all radio indicators in the same group
        const groupName = this.name;
        quoteForm.querySelectorAll(`input[name="${groupName}"]`).forEach((radio) => {
          const indicator = radio.nextElementSibling.querySelector(".w-3");
          indicator.classList.add("hidden");
        });
        
        if (this.checked) {
          const indicator = this.nextElementSibling.querySelector(".w-3");
          indicator.classList.remove("hidden");
        }
      });
    });

    // Label click handling for radio buttons
    const radioLabels = quoteForm.querySelectorAll('.custom-radio');
    radioLabels.forEach((label) => {
      label.addEventListener("click", function (e) {
        // Prevent double-firing when clicking on the input itself
        if (e.target.tagName.toLowerCase() === 'input') {
          return;
        }
        const input = this.querySelector('input[type="radio"]');
        if (input) {
          input.checked = true;
          input.dispatchEvent(new Event('change'));
        }
      });
    });

    // Custom checkboxes - 통합된 이벤트 처리
    const checkboxLabels = quoteForm.querySelectorAll('.custom-checkbox');
    checkboxLabels.forEach((label) => {
      const input = label.querySelector('input[type="checkbox"]');
      const wrapper = label.querySelector('.w-5');
      const indicator = wrapper.querySelector('.w-3');
      
      // 체크박스 상태 업데이트 함수
      function updateCheckboxState() {
        if (input.checked) {
          wrapper.classList.add("bg-primary", "border-primary");
          wrapper.classList.remove("border-gray-300");
          indicator.classList.remove("hidden");
        } else {
          wrapper.classList.remove("bg-primary", "border-primary");
          wrapper.classList.add("border-gray-300");
          indicator.classList.add("hidden");
        }
      }
      
      // 라벨 클릭 이벤트
      label.addEventListener("click", function (e) {
        // 입력 필드 자체를 클릭한 경우 중복 처리 방지
        if (e.target === input) {
          return;
        }
        e.preventDefault();
        input.checked = !input.checked;
        updateCheckboxState();
      });
      
      // 입력 필드 직접 클릭/키보드 조작 시
      input.addEventListener("change", updateCheckboxState);
      
      // 초기 상태 설정
      updateCheckboxState();
    });

    // Form submission
    quoteForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      // 폼 검증
      const company = quoteForm.company.value.trim();
      const name = quoteForm.name.value.trim();
      const phone = quoteForm.phone.value.trim();
      const email = quoteForm.email.value.trim();
      
      if (!company || !name || !phone || !email) {
        alert("필수 항목을 모두 입력해주세요.");
        return;
      }
      
      // 이메일 유효성 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("올바른 이메일 주소를 입력해주세요.");
        return;
      }
      
      // Collect form data
      const formData = new FormData(quoteForm);
      const volume = formData.get('volume');
      const services = formData.getAll('services');
      const message = formData.get('message');
      
      // Create email content
      const emailSubject = `HUSH 로켓그로스 서비스 견적 문의 - ${company}`;
      const emailBody = `
안녕하세요, HUSH 로켓그로스 서비스입니다.

다음과 같이 견적 문의를 접수했습니다:

═══════════════════════════════════════
📋 견적 문의 정보
═══════════════════════════════════════

🏢 업체명: ${company}
👤 담당자: ${name}  
📞 연락처: ${phone}
📧 이메일: ${email}
📦 예상 월 물량: ${volume || '선택하지 않음'}
🛠️ 관심 서비스: ${services.length > 0 ? services.join(', ') : '선택하지 않음'}
💬 기타 문의사항: ${message || '없음'}

⏰ 접수 시간: ${new Date().toLocaleString('ko-KR')}

═══════════════════════════════════════

빠른 시일 내에 담당자가 연락드리겠습니다.
감사합니다.

HUSH 로켓그로스 팀 드림
      `.trim();
      
      // EmailJS를 사용한 이메일 전송 (실제 환경에서 사용)
      if (typeof emailjs !== 'undefined') {
        // EmailJS를 통한 실제 이메일 전송
        const templateParams = {
          from_name: name,
          from_email: email,
          company: company,
          phone: phone,
          volume: volume || '선택하지 않음',
          services: services.length > 0 ? services.join(', ') : '선택하지 않음',
          message: message || '없음',
          to_email: 'imim2000@nate.com'
        };
        
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
          .then(function(response) {
            showSuccessMessage();
            resetForm();
          })
          .catch(function(error) {
            console.error('EmailJS 전송 실패:', error);
            // EmailJS 실패 시 mailto 대안 사용
            openMailtoLink(emailSubject, emailBody);
          });
      } else {
        // EmailJS가 없거나 설정되지 않은 경우 mailto 사용
        openMailtoLink(emailSubject, emailBody);
      }
      
      function openMailtoLink(subject, body) {
        const mailtoLink = `mailto:imim2000@nate.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink);
        showSuccessMessage("견적 요청이 접수되었습니다.\n이메일 클라이언트가 열렸습니다. 내용을 확인하시고 전송해주세요.");
        resetForm();
      }
      
      function showSuccessMessage(customMessage = null) {
        // 기존 성공 메시지 모달이 있다면 제거
        const existingModal = document.getElementById('success-modal');
        if (existingModal) {
          existingModal.remove();
        }
        
        const message = customMessage || "견적 요청이 성공적으로 전송되었습니다!";
        
        // 성공 메시지 모달 생성
        const modalHTML = `
          <div id="success-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style="animation: fadeIn 0.3s ease-out;">
            <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center" style="animation: slideUp 0.3s ease-out;">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="ri-check-line text-green-500 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">전송 완료!</h3>
              <p class="text-gray-600 mb-6 whitespace-pre-line">${message}<br><br>빠른 시일 내에 연락드리겠습니다.</p>
              <button id="success-modal-close" class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all">
                확인
              </button>
            </div>
          </div>
        `;
        
        // 모달을 body에 추가
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // 닫기 이벤트 추가
        const modal = document.getElementById('success-modal');
        const closeBtn = document.getElementById('success-modal-close');
        
        closeBtn.addEventListener('click', () => {
          modal.style.animation = 'fadeOut 0.3s ease-out';
          setTimeout(() => {
            modal.remove();
          }, 300);
        });
        
        // 모달 외부 클릭시 닫기
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
              modal.remove();
            }, 300);
          }
        });
        
        // ESC 키로 닫기
        const handleEscape = (e) => {
          if (e.key === 'Escape') {
            modal.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
              modal.remove();
            }, 300);
            document.removeEventListener('keydown', handleEscape);
          }
        };
        document.addEventListener('keydown', handleEscape);
        
        // 3초 후 자동 닫기
        setTimeout(() => {
          if (document.getElementById('success-modal')) {
            modal.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
              if (document.getElementById('success-modal')) {
                modal.remove();
              }
            }, 300);
          }
        }, 3000);
      }
      
      function resetForm() {
        // Reset form
        quoteForm.reset();

        // Reset custom radio controls
        quoteForm.querySelectorAll(".custom-radio .w-3").forEach((div) => {
          div.classList.add("hidden");
        });
        
        // Reset custom checkbox controls
        quoteForm.querySelectorAll(".custom-checkbox").forEach((label) => {
          const input = label.querySelector('input[type="checkbox"]');
          const wrapper = label.querySelector('.w-5');
          const indicator = wrapper.querySelector('.w-3');
          
          input.checked = false;
          wrapper.classList.remove("bg-primary", "border-primary");
          wrapper.classList.add("border-gray-300");
          indicator.classList.add("hidden");
        });
      }
    });
  }

  // Quote Modal functionality
  const quoteModal = document.getElementById('quote-modal');
  const quoteModalTrigger = document.getElementById('quote-modal-trigger');
  const quoteModalTrigger2 = document.getElementById('quote-modal-trigger-2');
  const quoteModalClose = document.getElementById('quote-modal-close');
  const quoteToContact = document.getElementById('quote-to-contact');

  function openQuoteModal() {
    if (quoteModal) {
      quoteModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeQuoteModal() {
    if (quoteModal) {
      quoteModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }

  if (quoteModalTrigger) {
    quoteModalTrigger.addEventListener('click', openQuoteModal);
  }

  if (quoteModalTrigger2) {
    quoteModalTrigger2.addEventListener('click', openQuoteModal);
  }

  if (quoteModalClose) {
    quoteModalClose.addEventListener('click', closeQuoteModal);
  }

  if (quoteToContact) {
    quoteToContact.addEventListener('click', function(e) {
      e.preventDefault();
      closeQuoteModal();
      // Scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Close quote modal when clicking outside
  if (quoteModal) {
    quoteModal.addEventListener('click', function(e) {
      if (e.target === quoteModal) {
        closeQuoteModal();
      }
    });
  }

  // Close quote modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !quoteModal.classList.contains('hidden')) {
      closeQuoteModal();
    }
  });

  // Tab functionality for caption section
  const captionTabs = document.querySelectorAll('.caption-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');

  captionTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all tabs
      captionTabs.forEach(t => {
        t.classList.remove('active', 'bg-primary', 'text-white');
        t.classList.add('bg-gray-200', 'text-gray-700');
      });
      
      // Add active class to clicked tab
      this.classList.add('active', 'bg-primary', 'text-white');
      this.classList.remove('bg-gray-200', 'text-gray-700');
      
      // Hide all tab panels
      tabPanels.forEach(panel => {
        panel.classList.add('hidden');
        panel.classList.remove('active');
      });
      
      // Show target tab panel
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) {
        targetPanel.classList.remove('hidden');
        targetPanel.classList.add('active');
      }
    });
  });

  // Quote modal triggers for tabs
  const quoteModalTriggerTab1 = document.getElementById('quote-modal-trigger-tab1');
  const quoteModalTriggerTab2 = document.getElementById('quote-modal-trigger-tab2');

  if (quoteModalTriggerTab1) {
    quoteModalTriggerTab1.addEventListener('click', openQuoteModal);
  }

  if (quoteModalTriggerTab2) {
    quoteModalTriggerTab2.addEventListener('click', openQuoteModal);
  }
}); 