/* ============================================
   ADVANCE PHYSIOTHERAPY — Premium JavaScript v2
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── Constants ─── */
    const WHATSAPP_NUMBER = '919054702563';
    const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
    const EMAIL_ADDRESS = 'devidparmar8954@gmail.com';

    /* ─── DOM References ─── */
    const header = document.getElementById('header');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    const faqItems = document.querySelectorAll('.faq__item');
    const appointmentForm = document.getElementById('appointmentForm');
    const btnWhatsApp = document.getElementById('btnWhatsApp');
    const btnEmail = document.getElementById('btnEmail');
    const footerYear = document.getElementById('footerYear');
    const visitTypeCards = document.querySelectorAll('.visit-card__input');
    const addressGroup = document.getElementById('addressGroup');
    const serviceTrigger = document.getElementById('serviceTrigger');
    const serviceSelector = document.getElementById('serviceSelector');
    const serviceDropdown = document.getElementById('serviceDropdown');
    const serviceOptions = document.querySelectorAll('.service-selector__option');
    const formServiceInput = document.getElementById('formService');
    const formSuccess = document.getElementById('formSuccess');
    const formSuccessSub = document.getElementById('formSuccessSub');
    const formDate = document.getElementById('formDate');
    const formTime = document.getElementById('formTime');


    /* ============================================
       1. FOOTER YEAR
       ============================================ */
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }


    /* ============================================
       2. DATE PICKER — SET MINIMUM TO TODAY
       ============================================ */
    if (formDate) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        formDate.min = `${yyyy}-${mm}-${dd}`;
    }


    /* ============================================
       3. STICKY HEADER
       ============================================ */
    function handleScroll() {
        if (window.scrollY > 24) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();


    /* ============================================
       4. MOBILE MENU
       ============================================ */
    function openMobileMenu() {
        hamburgerBtn.classList.add('is-active');
        mobileMenu.classList.add('is-open');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        hamburgerBtn.classList.remove('is-active');
        mobileMenu.classList.remove('is-open');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.contains('is-active') ? closeMobileMenu() : openMobileMenu();
    });

    mobileMenuLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
            closeMobileMenu();
        }
    });


    /* ============================================
       5. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
       ============================================ */
    const animatedElements = document.querySelectorAll('[data-animate]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
                setTimeout(() => {
                    el.classList.add('is-visible');
                }, delay);
                revealObserver.unobserve(el);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => revealObserver.observe(el));


    /* ============================================
       6. ANIMATED COUNTERS
       ============================================ */
    const counterElements = document.querySelectorAll('[data-count]');

    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = el.hasAttribute('data-decimal');
        const hasComma = el.hasAttribute('data-format') && el.getAttribute('data-format') === 'comma';
        const duration = 2000;
        const startTime = performance.now();

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            let current = easedProgress * target;

            if (isDecimal) {
                current = current.toFixed(1);
            } else {
                current = Math.floor(current);
            }

            if (hasComma && !isDecimal) {
                current = Number(current).toLocaleString('en-IN');
            }

            el.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));


    /* ============================================
       7. FAQ ACCORDION
       ============================================ */
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');

            /* Close all others */
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('is-open');
                    other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
                    other.querySelector('.faq__answer').setAttribute('aria-hidden', 'true');
                    other.querySelector('.faq__answer').style.maxHeight = '0';
                }
            });

            /* Toggle current */
            if (isOpen) {
                item.classList.remove('is-open');
                question.setAttribute('aria-expanded', 'false');
                answer.setAttribute('aria-hidden', 'true');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('is-open');
                question.setAttribute('aria-expanded', 'true');
                answer.setAttribute('aria-hidden', 'false');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });


    /* ============================================
       8. VISIT TYPE SELECTION — SMART ADDRESS
       ============================================ */
    visitTypeCards.forEach(radio => {
        radio.addEventListener('change', () => {
            const value = radio.value;
            clearError('visitTypeError');

            /* Update form progress - step 1 active */
            updateProgress(1);

            /* Show/hide address based on visit type */
            if (value === 'Home visit') {
                addressGroup.classList.add('is-visible');
            } else {
                addressGroup.classList.remove('is-visible');
            }
        });
    });


    /* ============================================
       9. CUSTOM SERVICE SELECTOR
       ============================================ */
    serviceTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        serviceSelector.classList.toggle('is-open');
        serviceTrigger.setAttribute('aria-expanded',
            serviceSelector.classList.contains('is-open') ? 'true' : 'false'
        );
    });

    serviceOptions.forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            const title = option.querySelector('.service-selector__option-title').textContent;

            /* Update hidden input */
            formServiceInput.value = value;

            /* Update trigger text */
            serviceTrigger.querySelector('.service-selector__text').textContent = title;
            serviceTrigger.classList.add('has-value');

            /* Mark selected */
            serviceOptions.forEach(o => o.classList.remove('is-selected'));
            option.classList.add('is-selected');

            /* Close dropdown */
            serviceSelector.classList.remove('is-open');
            serviceTrigger.setAttribute('aria-expanded', 'false');

            clearError('serviceError');
            updateProgress(2);
        });
    });

    /* Close service dropdown on outside click */
    document.addEventListener('click', (e) => {
        if (!serviceSelector.contains(e.target)) {
            serviceSelector.classList.remove('is-open');
            serviceTrigger.setAttribute('aria-expanded', 'false');
        }
    });


    /* ============================================
       10. FORM PROGRESS INDICATOR
       ============================================ */
    function updateProgress(step) {
        document.querySelectorAll('.form-progress__step').forEach(s => {
            const sStep = parseInt(s.getAttribute('data-step'), 10);
            if (sStep <= step) {
                s.classList.add('form-progress__step--active');
            }
        });
    }

    /* Watch personal fields for step 3 */
    const personalFields = [
        document.getElementById('formName'),
        document.getElementById('formPhone')
    ];

    personalFields.forEach(field => {
        if (field) {
            field.addEventListener('input', () => {
                if (field.value.trim().length > 0) {
                    updateProgress(3);
                }
            });
        }
    });


    /* ============================================
       11. FORM VALIDATION
       ============================================ */
    function getFormData() {
        const selectedVisit = document.querySelector('input[name="visitType"]:checked');
        return {
            name: document.getElementById('formName').value.trim(),
            phone: document.getElementById('formPhone').value.trim(),
            visitType: selectedVisit ? selectedVisit.value : '',
            service: formServiceInput.value,
            date: document.getElementById('formDate').value,
            time: document.getElementById('formTime').value,
            address: document.getElementById('formAddress').value.trim(),
            message: document.getElementById('formMessage').value.trim()
        };
    }

    function showError(fieldId, message) {
        const errorEl = document.getElementById(fieldId);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('is-visible');
        }
    }

    function clearError(fieldId) {
        const errorEl = document.getElementById(fieldId);
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.classList.remove('is-visible');
        }
    }

    function clearAllErrors() {
        document.querySelectorAll('.form-error').forEach(el => {
            el.textContent = '';
            el.classList.remove('is-visible');
        });
        document.querySelectorAll('.form-input.has-error').forEach(el => {
            el.classList.remove('has-error');
        });
    }

    function validateForm(data) {
        clearAllErrors();
        let isValid = true;

        if (!data.visitType) {
            showError('visitTypeError', 'Please select a visit type.');
            isValid = false;
        }

        if (!data.service) {
            showError('serviceError', 'Please select a service or condition.');
            isValid = false;
        }

        if (!data.name) {
            showError('nameError', 'Please enter your full name.');
            document.getElementById('formName').classList.add('has-error');
            isValid = false;
        }

        if (!data.phone) {
            showError('phoneError', 'Please enter your phone number.');
            document.getElementById('formPhone').classList.add('has-error');
            isValid = false;
        }

        if (!data.date) {
            showError('dateError', 'Please select a preferred date.');
            document.getElementById('formDate').classList.add('has-error');
            isValid = false;
        }

        if (!data.time) {
            showError('timeError', 'Please select a preferred time.');
            document.getElementById('formTime').classList.add('has-error');
            isValid = false;
        }

        if (data.visitType === 'Home visit' && !data.address) {
            showError('addressError', 'Address is required for home visits.');
            document.getElementById('formAddress').classList.add('has-error');
            isValid = false;
        }

        return isValid;
    }

    /* Remove errors on input */
    document.querySelectorAll('.form-input').forEach(input => {
        const events = input.tagName === 'SELECT' ? ['change'] : ['input', 'change'];
        events.forEach(evt => {
            input.addEventListener(evt, () => {
                input.classList.remove('has-error');
            });
        });
    });


    /* ============================================
       12. FORMAT DATE & TIME FOR MESSAGE
       ============================================ */
    function formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr + 'T00:00:00');
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return d.toLocaleDateString('en-IN', options);
    }

    function formatTime(timeStr) {
        if (!timeStr) return '';
        const [hours, minutes] = timeStr.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const h = hours % 12 || 12;
        const m = String(minutes).padStart(2, '0');
        return `${h}:${m} ${period}`;
    }


    /* ============================================
       13. WHATSAPP MESSAGE BUILDER
       ============================================ */
    function buildWhatsAppMessage(data) {
        let msg = 'Hello Dr. Jitu,\n\nI would like to enquire about a physiotherapy appointment.\n\n';
        if (data.name) msg += `Name: ${data.name}\n`;
        if (data.phone) msg += `Phone: ${data.phone}\n\n`;
        if (data.visitType) msg += `Visit Type: ${data.visitType}\n\n`;
        if (data.service) msg += `Service:\n${data.service}\n\n`;
        if (data.date) msg += `Preferred Date:\n${formatDate(data.date)}\n\n`;
        if (data.time) msg += `Preferred Time:\n${formatTime(data.time)}\n\n`;
        if (data.address) msg += `Address:\n${data.address}\n\n`;
        if (data.message) msg += `Additional Concern:\n${data.message}\n\n`;
        msg += 'Thank you.';
        return msg;
    }

    function buildEmailBody(data) {
        let body = 'Hello Dr. Jitu,\n\nI would like to enquire about a physiotherapy appointment.\n\n';
        if (data.name) body += `Name: ${data.name}\n`;
        if (data.phone) body += `Phone: ${data.phone}\n\n`;
        if (data.visitType) body += `Visit Type: ${data.visitType}\n\n`;
        if (data.service) body += `Service: ${data.service}\n\n`;
        if (data.date) body += `Preferred Date: ${formatDate(data.date)}\n\n`;
        if (data.time) body += `Preferred Time: ${formatTime(data.time)}\n\n`;
        if (data.address) body += `Address: ${data.address}\n\n`;
        if (data.message) body += `Additional Concern: ${data.message}\n\n`;
        body += 'Thank you.';
        return body;
    }


    /* ============================================
       14. SHOW SUCCESS & SUBMIT
       ============================================ */
    function showSuccessAndOpen(type, url) {
        formSuccessSub.textContent = type === 'whatsapp'
            ? 'Opening WhatsApp…'
            : 'Opening email app…';

        formSuccess.classList.add('is-visible');
        formSuccess.setAttribute('aria-hidden', 'false');

        setTimeout(() => {
            if (type === 'whatsapp') {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = url;
            }

            /* Hide success after a moment */
            setTimeout(() => {
                formSuccess.classList.remove('is-visible');
                formSuccess.setAttribute('aria-hidden', 'true');
            }, 2000);
        }, 800);
    }


    /* ============================================
       15. WHATSAPP BUTTON
       ============================================ */
    btnWhatsApp.addEventListener('click', () => {
        const data = getFormData();
        if (!validateForm(data)) return;

        const message = buildWhatsAppMessage(data);
        const url = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
        showSuccessAndOpen('whatsapp', url);
    });


    /* ============================================
       16. EMAIL BUTTON
       ============================================ */
    btnEmail.addEventListener('click', () => {
        const data = getFormData();
        if (!validateForm(data)) return;

        const subject = 'Physiotherapy Appointment Enquiry – Advance Physiotherapy';
        const body = buildEmailBody(data);
        const url = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        showSuccessAndOpen('email', url);
    });


    /* ============================================
       17. SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerH = parseInt(
                    getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10
                ) || 76;
                const top = target.getBoundingClientRect().top + window.scrollY - headerH;

                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});
