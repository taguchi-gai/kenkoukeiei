// 健康経営優良法人認定 ランディングページ JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQアコーディオン
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.maxHeight;
            
            // すべてのFAQを閉じる
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.style.maxHeight = null;
            });
            
            // クリックされたFAQを開く（すでに開いている場合は閉じる）
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 数字のカウントアップアニメーション
    const numberElements = document.querySelectorAll('.data-number .number');
    
    // Intersection Observerの設定
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = parseInt(element.textContent);
                
                // カウントアップアニメーション
                let startValue = 0;
                const duration = 2000; // 2秒間
                const increment = Math.ceil(finalValue / (duration / 20)); // 20msごとの増加量
                
                const timer = setInterval(() => {
                    startValue += increment;
                    if (startValue > finalValue) {
                        element.textContent = finalValue.toLocaleString();
                        clearInterval(timer);
                    } else {
                        element.textContent = startValue.toLocaleString();
                    }
                }, 20);
                
                // 一度アニメーションしたら監視を解除
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    // 数字要素を監視
    numberElements.forEach(element => {
        // 初期値を保存
        const finalValue = element.textContent;
        // 表示を0に設定
        element.textContent = '0';
        // 監視開始
        observer.observe(element);
    });

    // フォーム送信処理
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // 通常はここでAPIにデータを送信
            // この例ではアラートで送信完了を表示
            alert('お問い合わせありがとうございます。担当者より折り返しご連絡いたします。');
            
            // フォームをリセット
            this.reset();
        });
    }

    // スクロール時のヘッダー表示制御
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // 下にスクロール時、ヘッダーを隠す
            header.style.transform = 'translateY(-100%)';
        } else {
            // 上にスクロール時、ヘッダーを表示
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // スクロールトップボタン
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // スクロール位置に応じてボタンの表示/非表示を切り替え
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // ボタンクリック時のスクロールトップ処理
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // スタイルをCSSに追加
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: var(--light-color);
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.25rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        }
        
        .scroll-top-btn.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-top-btn:hover {
            background-color: var(--accent-color);
        }
        
        .header {
            transition: transform 0.3s ease;
        }
        
        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});
